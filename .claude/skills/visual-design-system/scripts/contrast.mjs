// Uso: node .claude/skills/visual-design-system/scripts/contrast.mjs "#F2EDE4" "#141210" ...
// Pasa pares fg bg; imprime ratio WCAG y si cumple AA texto normal / grande.
const pairs = process.argv.slice(2);
if (pairs.length < 2 || pairs.length % 2) {
  console.error("Pasa pares: fg bg [fg bg ...]");
  process.exit(1);
}
const lum = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const c = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
};
for (let i = 0; i < pairs.length; i += 2) {
  const [a, b] = [lum(pairs[i]), lum(pairs[i + 1])];
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  console.log(
    `${pairs[i]} sobre ${pairs[i + 1]}: ${ratio.toFixed(2)}:1  AA normal ${ratio >= 4.5 ? "✔" : "✘"}  AA grande ${ratio >= 3 ? "✔" : "✘"}`
  );
}
