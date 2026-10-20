#!/usr/bin/env python3
"""
Suite de QA en navegador real (Playwright + Chromium) contra el build estático (out/).
Uso:  npm run build && npm run qa
Salida: qa/results.json, qa/screenshots/*.png y resumen en consola.
Cada prueba registra PASS/FAIL con su evidencia; nada se marca aprobado sin ejecutarse.
"""
import json, os, re, socket, subprocess, sys, time, threading, http.server, functools
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "out"
SHOTS = ROOT / "qa" / "screenshots"
SHOTS.mkdir(parents=True, exist_ok=True)
AXE = (ROOT / "node_modules" / "axe-core" / "axe.min.js").read_text()
WA_NUMBER = "573132867686"
VIEWPORTS = {
    "movil-pequeno": (320, 640), "movil-grande": (414, 896), "movil-horizontal": (844, 390),
    "tableta": (768, 1024), "portatil": (1280, 800), "escritorio": (1600, 1000),
}
results = []


def record(name, ok, evidence):
    results.append({"prueba": name, "resultado": "PASS" if ok else "FAIL", "evidencia": evidence})
    print(f"[{'PASS' if ok else 'FAIL'}] {name} — {evidence if isinstance(evidence, str) else json.dumps(evidence, ensure_ascii=False)[:300]}")


def free_port():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p


def serve():
    port = free_port()
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a, **k):
            pass
    handler = functools.partial(Quiet, directory=str(OUT))
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f"http://127.0.0.1:{port}/"


def scroll_through(page, step=0.6, pause=0.25):
    h = page.evaluate("document.documentElement.scrollHeight")
    vh = page.evaluate("innerHeight")
    y = 0
    while y < h:
        y += int(vh * step)
        page.mouse.wheel(0, int(vh * step))
        time.sleep(pause)
        h = page.evaluate("document.documentElement.scrollHeight")
    time.sleep(1.5)


OPEN_SPY = "window.__opened=[];window.open=(u,...r)=>{window.__opened.push(u);return null;};"


def main():
    if not (OUT / "index.html").exists():
        sys.exit("Falta out/index.html: ejecuta `npm run build` primero.")
    srv, BASE = serve()
    with sync_playwright() as p:
        browser = p.chromium.launch()

        # ── 1. Carga, consola, red, imágenes, animaciones (escritorio) ──
        ctx = browser.new_context(viewport={"width": 1440, "height": 900})
        ctx.add_init_script(OPEN_SPY)
        page = ctx.new_page()
        console, pageerrors, failed = [], [], []
        page.on("console", lambda m: console.append(f"{m.type}: {m.text}") if m.type in ("error", "warning") else None)
        page.on("pageerror", lambda e: pageerrors.append(str(e)))
        page.on("requestfailed", lambda r: failed.append(r.url))
        t0 = time.time()
        resp = page.goto(BASE, wait_until="load")
        load_s = round(time.time() - t0, 2)
        record("Carga inicial (HTTP 200)", resp.status == 200, f"status {resp.status}, load {load_s}s")
        time.sleep(3)
        page.screenshot(path=str(SHOTS / "escritorio-hero.jpg"), type="jpeg", quality=72)

        lcp = page.evaluate("""() => new Promise(r => { let v=0; new PerformanceObserver(l => { for (const e of l.getEntries()) v=e.startTime; }).observe({type:'largest-contentful-paint', buffered:true}); setTimeout(()=>r(Math.round(v)),300); })""")

        # Pin horizontal de proyectos activo en escritorio
        pinned = page.evaluate("!!document.querySelector('#proyectos')?.closest('.pin-spacer')")
        record("Proyectos: sección fijada (pin) en escritorio", pinned, f"pin-spacer presente: {pinned}")

        scroll_through(page)
        # Tras recorrer todo: estado final de animaciones
        anim = page.evaluate("""() => {
          const op = s => [...document.querySelectorAll(s)].map(e => +getComputedStyle(e).opacity);
          const clip = s => [...document.querySelectorAll(s)].map(e => getComputedStyle(e).clipPath);
          return {
            reveal: op('[data-reveal]'), heroLines: op('[data-hero-line]'), fade: op('[data-fade]'),
            words: op('[data-word]'), mask: clip('[data-mask]'), clipx: clip('[data-clip-x]'),
            splitLines: document.querySelectorAll('.split-line').length,
          };
        }""")
        bad = {k: v for k, v in anim.items() if isinstance(v, list) and any((x != 1 if isinstance(x, (int, float)) else not (x in ('none', 'inset(0%)', 'inset(0px)') or x.startswith('inset(0'))) for x in v)}
        record("Animaciones: estado final visible tras scroll completo", not bad, {"elementos": {k: len(v) if isinstance(v, list) else v for k, v in anim.items()}, "no_finalizados": bad})

        # Proyectos: la pista se desplazó horizontalmente
        tx = page.evaluate("""() => { const t=document.querySelector('#proyectos [class*="lg:w-max"]'); return t ? getComputedStyle(t).transform : null; }""")
        record("Proyectos: pista horizontal desplazada por el scroll", bool(tx) and tx != "none", f"transform: {tx}")

        imgs = page.evaluate("""() => [...document.images].map(i => ({src: i.currentSrc.split('/').pop(), ok: i.complete && i.naturalWidth > 0, alt: i.getAttribute('alt')}))""")
        broken = [i for i in imgs if not i["ok"]]
        noalt = [i for i in imgs if i["alt"] is None]
        record("Imágenes: todas cargan", not broken, f"{len(imgs)} imágenes, rotas: {broken}")
        record("Imágenes: todas tienen atributo alt", not noalt, f"sin alt: {noalt}")

        page.screenshot(path=str(SHOTS / "escritorio-final.jpg"), type="jpeg", quality=72)
        record("Consola sin errores ni warnings", not console and not pageerrors, {"console": console[:10], "pageerror": pageerrors[:5]})
        record("Sin peticiones fallidas", not failed, failed[:10] or "0 fallidas")

        perf = page.evaluate("""() => { const r = performance.getEntriesByType('resource'); const n = performance.getEntriesByType('navigation')[0];
          const total = r.reduce((a,e)=>a+(e.transferSize||e.encodedBodySize||0),0) + (n ? (n.transferSize||n.encodedBodySize||0) : 0);
          const js = r.filter(e=>/\\.js(\\?|$)/.test(e.name)).reduce((a,e)=>a+(e.encodedBodySize||0),0);
          const img = r.filter(e=>/\\.(webp|png|jpg)/.test(e.name)).reduce((a,e)=>a+(e.encodedBodySize||0),0);
          return {requests: r.length+1, totalKB: Math.round(total/1024), jsKB: Math.round(js/1024), imgKB: Math.round(img/1024), domContentLoadedMs: n ? Math.round(n.domContentLoadedEventEnd) : null}; }""")
        perf["lcpMs_headless"] = lcp
        record("Rendimiento (orientativo, headless local)", perf["totalKB"] < 2500 and (lcp or 0) < 2500, perf)

        # ── 2. Metadatos ──
        meta = page.evaluate("""() => { const g = s => document.querySelector(s)?.getAttribute('content') ?? document.querySelector(s)?.getAttribute('href') ?? null;
          let ld=null, ldOk=false; try { ld = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent); ldOk=true; } catch(e){}
          return { title: document.title, lang: document.documentElement.lang, description: g('meta[name="description"]'), canonical: g('link[rel="canonical"]'),
            ogTitle: g('meta[property="og:title"]'), ogImage: g('meta[property="og:image"]'), ogLocale: g('meta[property="og:locale"]'),
            twitter: g('meta[name="twitter:card"]'), icon: g('link[rel="icon"]'), apple: g('link[rel="apple-touch-icon"]'),
            h1: document.querySelectorAll('h1').length, ldOk, ldType: ld?.['@type'], ldKeys: ld ? Object.keys(ld) : [] }; }""")
        meta_ok = all([meta["title"], meta["description"], meta["canonical"], meta["ogTitle"], meta["ogImage"], meta["icon"], meta["ldOk"]]) and meta["h1"] == 1 and meta["lang"] == "es-CO"
        forbidden = [k for k in meta["ldKeys"] if k in ("aggregateRating", "review", "priceRange", "openingHours")]
        record("Metadatos SEO/OG/JSON-LD presentes y un único h1", meta_ok and not forbidden, meta)
        for f in ("robots.txt", "sitemap.xml", "og.jpg", "icon.png"):
            r = page.request.get(BASE + f)
            record(f"Archivo /{f} servido", r.status == 200, f"status {r.status}")

        # ── 3. Enlaces ──
        links = page.evaluate("""() => [...document.querySelectorAll('a[href]')].map(a => ({href: a.getAttribute('href'), target: a.target, rel: a.rel, text: (a.textContent||'').trim().slice(0,40)}))""")
        anchors = [l for l in links if l["href"].startswith("#")]
        missing = [l["href"] for l in anchors if not page.evaluate("id => !!document.getElementById(id)", l["href"][1:])]
        record("Enlaces internos (anclas) apuntan a secciones existentes", not missing, f"{len(anchors)} anclas, rotas: {missing}")
        empty = [l for l in links if l["href"] in ("", "#")]
        record("Ningún enlace vacío o '#'", not empty, f"vacíos: {empty}")
        ext = [l for l in links if re.match(r"https?:", l["href"])]
        unsafe = [l["href"] for l in ext if l["target"] != "_blank" or "noopener" not in l["rel"]]
        record("Enlaces externos con target=_blank y rel=noopener", not unsafe, f"{len(ext)} externos, inseguros: {unsafe}")
        wa = [l["href"] for l in links if "wa.me" in l["href"]]
        wa_bad = [h for h in wa if f"wa.me/{WA_NUMBER}" not in h]
        record("Todos los CTA de WhatsApp usan el número verificado", wa and not wa_bad, f"{len(wa)} enlaces WhatsApp, incorrectos: {wa_bad}")
        decoded = [unquote(parse_qs(urlparse(h).query).get("text", [""])[0]) for h in wa]
        record("Mensajes de WhatsApp prellenados con contexto", all(d.startswith("Hola Romeral") for d in decoded), decoded[:4])
        shop = [l for l in links if "myshopify" in l["href"]]
        record("No se enlaza la tienda Shopify caída", not shop, f"enlaces a Shopify: {len(shop)}")

        # ── 4. Formulario ──
        page.goto(BASE + "#contacto"); time.sleep(1.5)
        page.click("button[type=submit]"); time.sleep(0.3)
        errs = page.locator("#contacto [id$='-error']").count()
        opened = page.evaluate("window.__opened.length")
        focused = page.evaluate("document.activeElement?.name || document.activeElement?.id")
        record("Formulario: vacío bloquea envío y muestra errores", errs >= 3 and opened == 0, f"{errs} errores, window.open llamado {opened} veces, foco en '{focused}'")
        page.fill("input[name=nombre]", "Ana Prueba")
        page.fill("input[name=ciudad]", "Bogotá")
        page.locator("#contacto").get_by_text("Comedor", exact=True).click()
        page.fill("input[name=medidas]", "160 x 90 cm")
        page.fill("textarea[name=mensaje]", "Para 6 personas")
        page.click("button[type=submit]"); time.sleep(0.4)
        urls = page.evaluate("window.__opened")
        msg = unquote(parse_qs(urlparse(urls[0]).query)["text"][0]) if urls else ""
        status = page.locator("#contacto [aria-live=polite]").inner_text()
        ok = bool(urls) and f"wa.me/{WA_NUMBER}" in urls[0] and "Ana Prueba" in msg and "Bogotá" in msg and "Comedor" in msg and "160 x 90" in msg
        honest = "no se ha enviado" in status.lower() and "enviado con éxito" not in status.lower()
        record("Formulario: datos válidos abren WhatsApp con el mensaje compuesto", ok, {"url": urls[0][:60] + "…" if urls else None, "mensaje": msg})
        record("Formulario: no muestra falso 'enviado'", honest, status)
        page.screenshot(path=str(SHOTS / "formulario-listo.jpg"), type="jpeg", quality=72, full_page=False)

        # ── 5. Teclado ──
        page.goto(BASE); time.sleep(1)
        page.keyboard.press("Tab")
        first = page.evaluate("document.activeElement.textContent.trim()")
        page.keyboard.press("Enter"); time.sleep(0.3)
        after = page.evaluate("document.activeElement.id")
        record("Teclado: skip link es el primer foco y lleva al contenido", "Saltar" in first and after == "contenido", f"primer foco '{first}', luego #{after}")
        outline = page.evaluate("""() => { const a=document.querySelector('[data-cta=hero-whatsapp]'); a.focus(); const s=getComputedStyle(a); return s.outlineStyle+' '+s.outlineWidth+' '+s.outlineColor; }""")
        record("Teclado: foco visible en botones", "solid" in outline and not outline.split()[1].startswith("0"), outline)
        ctx.close()

        # ── 6. Menú móvil ──
        ctx = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        page = ctx.new_page(); m_errors = []
        page.on("pageerror", lambda e: m_errors.append(str(e)))
        page.goto(BASE); time.sleep(2)
        toggle = page.locator("button[aria-controls=menu-movil]")
        toggle.click(); time.sleep(0.8)
        vis = page.locator("#menu-movil").is_visible()
        exp = toggle.get_attribute("aria-expanded")
        page.screenshot(path=str(SHOTS / "movil-menu-abierto.jpg"), type="jpeg", quality=72)
        page.keyboard.press("Escape"); time.sleep(0.4)
        closed = page.locator("#menu-movil").count() == 0
        back = page.evaluate("document.activeElement.getAttribute('aria-controls')")
        record("Menú móvil: abre, Esc cierra y el foco vuelve al botón", vis and exp == "true" and closed and back == "menu-movil", f"visible={vis}, aria-expanded={exp}, cerrado={closed}, foco={back}")
        toggle.click(); time.sleep(0.5)
        page.locator("#menu-movil a[href='#proceso']").click(); time.sleep(1.5)
        record("Menú móvil: enlace navega y cierra el menú", page.locator("#menu-movil").count() == 0 and page.evaluate("scrollY") > 500, f"scrollY={page.evaluate('scrollY')}")
        # Carrusel nativo de proyectos (sin pin en móvil)
        page.goto(BASE + "#proyectos"); time.sleep(1.5)
        pin_m = page.evaluate("!!document.querySelector('#proyectos')?.closest('.pin-spacer')")
        sc = page.locator("#proyectos .snap-track")
        before = sc.evaluate("e => e.scrollLeft")
        page.click("button[aria-label='Proyecto siguiente']"); time.sleep(0.9)
        after_s = sc.evaluate("e => e.scrollLeft")
        counter = page.locator("#proyectos [aria-live=polite]").inner_text()
        record("Móvil: proyectos sin pin, carrusel avanza con botón", not pin_m and after_s > before, f"pin={pin_m}, scrollLeft {before}→{after_s}, contador '{counter}'")
        bar_hidden_top = page.evaluate("getComputedStyle(document.querySelector('[data-cta=mobile-bar-whatsapp]').parentElement).transform")
        record("Móvil: barra fija de WhatsApp visible fuera del hero", bar_hidden_top in ("none", "matrix(1, 0, 0, 1, 0, 0)"), bar_hidden_top)
        record("Móvil: sin errores de JS", not m_errors, m_errors or "0")
        ctx.close()

        # ── 7. Movimiento reducido ──
        ctx = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
        page = ctx.new_page(); page.goto(BASE); time.sleep(1.5)
        rm = page.evaluate("""() => ({
          hidden: [...document.querySelectorAll('[data-reveal],[data-fade],[data-hero-line],[data-word]')].filter(e => +getComputedStyle(e).opacity < 1).length,
          pinned: !!document.querySelector('#proyectos')?.closest('.pin-spacer'),
          masks: [...document.querySelectorAll('[data-mask],[data-clip-x],[data-hero-main]')].filter(e => getComputedStyle(e).clipPath !== 'none').length })""")
        record("Movimiento reducido: todo visible, sin pin ni máscaras", rm["hidden"] == 0 and not rm["pinned"] and rm["masks"] == 0, rm)
        page.screenshot(path=str(SHOTS / "reduced-motion.jpg"), type="jpeg", quality=72, full_page=True)
        ctx.close()

        # ── 8. Responsive + axe ──
        overflow = {}
        axe_all, axe_initial = {}, {}
        for name, (w, h) in VIEWPORTS.items():
            ctx = browser.new_context(viewport={"width": w, "height": h}, is_mobile=w < 768, has_touch=w < 1024)
            page = ctx.new_page(); page.goto(BASE); time.sleep(1.5)
            scroll_through(page, step=0.8, pause=0.15)
            ov = page.evaluate("document.documentElement.scrollWidth - innerWidth")
            wide = page.evaluate("""() => [...document.querySelectorAll('body *')].filter(e => { const r=e.getBoundingClientRect(); return r.width>0 && r.right > innerWidth + 1 && !e.closest('.snap-track,#proyectos'); }).slice(0,5).map(e => e.tagName+'.'+(e.className||'').toString().slice(0,40))""")
            overflow[name] = {"px": ov, "elementos": wide}
            small_font = page.evaluate("""() => { const p=[...document.querySelectorAll('p')].filter(e=>e.offsetParent && e.textContent.trim().length>40); return Math.min(...p.map(e=>parseFloat(getComputedStyle(e).fontSize))); }""")
            overflow[name]["fuente_min_parrafos_px"] = small_font
            targets = page.evaluate("""() => [...document.querySelectorAll('a.btn,button')].filter(e=>e.offsetParent).map(e=>e.getBoundingClientRect()).filter(r=>r.height<44 && r.width>0).length""")
            overflow[name]["botones_<44px"] = targets
            AXE_RUN = "async () => { const r = await axe.run(document, {resultTypes:['violations']}); return r.violations.map(v => ({id:v.id, impact:v.impact, n:v.nodes.length, target:v.nodes.slice(0,3).map(n=>n.target.join(' '))})); }"
            if name in ("movil-grande", "escritorio"):
                # Estado final (tras recorrer la página, como la ve quien lee)
                page.add_script_tag(content=AXE)
                axe_all[name] = page.evaluate(AXE_RUN)
            page.evaluate("window.scrollTo(0,0)"); time.sleep(0.8)
            if name in ("movil-grande", "escritorio"):
                # Estado inicial: incluye texto aún no revelado por scroll (informativo)
                axe_initial[name] = page.evaluate(AXE_RUN)
            page.screenshot(path=str(SHOTS / f"responsive-{name}.jpg"), type="jpeg", quality=72, full_page=True)
            ctx.close()
        record("Responsive: sin desbordamiento horizontal en 6 viewports", all(v["px"] <= 0 for v in overflow.values()), overflow)
        record("Responsive: botones con objetivo táctil ≥ 44px", all(v["botones_<44px"] == 0 for v in overflow.values()), {k: v["botones_<44px"] for k, v in overflow.items()})
        serious = {k: [v for v in vs if v["impact"] in ("serious", "critical")] for k, vs in axe_all.items()}
        record("Accesibilidad (axe-core 4.14): 0 violaciones serias/críticas (estado final)", all(not v for v in serious.values()), axe_all)
        results.append({"prueba": "Accesibilidad axe en estado inicial (informativo)", "resultado": "INFO", "evidencia": axe_initial})
        print("[INFO] axe estado inicial —", json.dumps(axe_initial, ensure_ascii=False)[:400])

        browser.close()
    srv.shutdown()
    (ROOT / "qa").mkdir(exist_ok=True)
    (ROOT / "qa" / "results.json").write_text(json.dumps({"fecha": time.strftime("%Y-%m-%d %H:%M"), "resultados": results}, ensure_ascii=False, indent=2))
    fails = [r for r in results if r["resultado"] == "FAIL"]
    graded = [r for r in results if r["resultado"] != "INFO"]
    print(f"\n{len(graded) - len(fails)}/{len(graded)} pruebas PASS")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
