/**
 * Fuente única del contenido del sitio.
 * Todo dato aquí está VERIFICADO en docs/business-research.md, salvo lo marcado `pending`.
 * No añadas precios, medidas, tiempos de entrega, garantías ni testimonios sin fuente.
 */
import images from "./images.json";

export type BrandImage = { src: string; width: number; height: number };
const img = (k: keyof typeof images): BrandImage => images[k];

export const site = {
  name: "Romeral Trailers",
  shortName: "Romeral",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://romeraltrailers.com", // PENDIENTE: dominio real
  locale: "es_CO",
  city: "Medellín",
  description:
    "Taller de diseño en Medellín. Fabricamos muebles a medida de estilo industrial y minimalista: comedores, salas y cocinas. Envíos nacionales.",
  seoTitle: "Romeral Trailers · Muebles a medida en Medellín",
};

export const contact = {
  /** Número verificado en wa.link/pxy8ps (bio) y publicación del 7 oct 2024. */
  whatsappNumber: "573132867686",
  whatsappDisplay: "+57 313 286 7686",
  whatsappGreeting: "Hola Romeral 👋",
  email: "romeraltlr@gmail.com",
  instagram: "https://www.instagram.com/romeraltrailers/",
  instagramHandle: "@romeraltrailers",
  facebook: "https://www.facebook.com/Romeraltrailers",
  /** Publicado en oct 2024. Vigencia sin confirmar → no se muestra hasta validar. */
  showroom: {
    enabled: false,
    label: "Mall Portal de la Estrella · Local 23",
  },
  /** La tienda Shopify enlazada en la bio está desactivada (oct 2026) → no se enlaza. */
  shop: { enabled: false, url: "https://romeral-trailers.myshopify.com" },
};

export const nav = [
  { href: "#coleccion", label: "Colección" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
];

export const hero = {
  eyebrow: "Taller de diseño · Medellín",
  titleLines: ["Muebles hechos", "a medida,"],
  titleAccent: "con intención.",
  lead: "Somos fabricantes. Diseñamos y construimos comedores, salas y cocinas de estilo industrial y minimalista, del taller directo a tu casa.",
  primaryCta: "Cotizar por WhatsApp",
  secondaryCta: "Ver colección",
  image: img("01-comedor-sake"),
  imageAlt:
    "Comedor con mesa Sake de madera y estructura metálica negra, sillas Wuam tapizadas en crema y espejos ovalados de marco negro",
  secondaryImage: img("04-comedor-berlin"),
  secondaryImageAlt: "Comedor Berlín de roble macizo con patas metálicas negras frente a un muro de concreto",
  attributes: ["Fabricación propia", "Diseño a medida", "Asesoría de interiorismo", "Envíos nacionales"],
};

export const philosophy = {
  eyebrow: "Nuestra filosofía",
  /** Frases publicadas por la marca en Instagram (feb 2026). */
  quote: "El diseño no es improvisación, es intención. El buen diseño no es solo cómo se ve… es cómo se vive.",
  note: "Cada pieza se piensa para tu espacio, tu estilo de vida y tu esencia.",
};

export type Product = {
  id: string;
  name: string;
  kicker: string;
  description: string;
  image: BrandImage;
  alt: string;
  source: string;
};

export const collection: { eyebrow: string; title: string; accent: string; intro: string; items: Product[] } = {
  eyebrow: "Colección",
  title: "Piezas que se",
  accent: "personalizan",
  intro:
    "Estas son algunas referencias que hemos fabricado. Todas se pueden ajustar en medidas y acabados: cuéntanos tu espacio y te cotizamos.",
  items: [
    {
      id: "berlin",
      name: "Comedor Berlín",
      kicker: "Mesa + silla Berlín",
      description: "Roble macizo y estructura metálica: un comedor estable, duradero y protagonista.",
      image: img("04-comedor-berlin"),
      alt: "Comedor Berlín de roble macizo con patas metálicas y sillas tapizadas en gris",
      source: "Instagram, 22 sep 2026",
    },
    {
      id: "bruxelles",
      name: "Comedor Bruxelles",
      kicker: "Para espacios pequeños",
      description: "Diseño, funcionalidad y mucha personalidad para comedores compactos.",
      image: img("06-comedor-bruxelles"),
      alt: "Comedor Bruxelles con mesa redonda de madera, base metálica negra y cuatro sillas tapizadas en beige",
      source: "Instagram, 25 jun 2026",
    },
    {
      id: "sake",
      name: "Mesa Sake",
      kicker: "Con silla Wuam y espejo Oval",
      description: "Sofisticado, fresco y moderno: madera, metal negro y tapizado claro.",
      image: img("01-comedor-sake"),
      alt: "Mesa Sake de madera con sillas Wuam tapizadas en crema y espejos ovalados",
      source: "Instagram, 12 ago 2025",
    },
    {
      id: "banca",
      name: "Comedor con banca",
      kicker: "El corazón de la casa",
      description: "Mesa de madera con patas metálicas en ángulo, banca y sillas: hecho para reunirse.",
      image: img("05-comedor-banca"),
      alt: "Comedor de madera con patas metálicas negras en ángulo, banca y sillas de madera bajo un espejo de marco negro",
      source: "Instagram, 27 jun 2026",
    },
  ],
};

export type Project = {
  id: string;
  title: string;
  place?: string;
  description: string;
  image: BrandImage;
  alt: string;
  quote?: { text: string; author: string };
};

export const projects: { eyebrow: string; title: string; accent: string; items: Project[] } = {
  eyebrow: "Proyectos",
  title: "Espacios completos,",
  accent: "de principio a fin",
  items: [
    {
      id: "santa-marta",
      title: "Airbnb en Santa Marta",
      place: "Santa Marta",
      description:
        "Fabricamos cada mueble a medida para este Airbnb y viajamos a la costa para que la instalación quedara perfecta.",
      image: img("08-airbnb-santa-marta"),
      alt: "Apartaestudio Airbnb en Santa Marta con sofá oscuro, cama, panel de listones iluminado y vista a las montañas",
    },
    {
      id: "cocinas",
      title: "Cocinas a la medida",
      description: "Donde el diseño se convierte en experiencia: cocinas hechas a medida, con detalles que marcan la diferencia.",
      image: img("09-cocina-a-medida"),
      alt: "Cocina lineal a medida con gabinetes oscuros, iluminación LED, isla de piedra veteada y revestimiento de madera",
    },
    {
      id: "estudio",
      title: "Un estudio creativo",
      description:
        "Con asesoría de interiorismo personalizada y muebles diseñados con alma, creamos el corazón creativo de @viralbymafe.",
      image: img("10-estudio-viralbymafe"),
      alt: "Estudio de creadora de contenido con escritorio de madera, estanterías metálicas e iluminación LED violeta",
      quote: { text: "Era justo lo que soñaba.", author: "@viralbymafe, según publicó Romeral" },
    },
  ],
};

/** Pieza gráfica publicada por la marca (7 oct 2024) con su propio texto incrustado. */
export const statement = {
  image: img("03-salon-social"),
  alt: "Espacio social con sofá modular claro, comedor y cocina abierta; sobre la foto, el texto de la marca «Hacemos los muebles de tus sueños»",
  text: "En Romeral no somos simplemente muebles, somos sueños.",
};

export const advisory = {
  eyebrow: "Asesoría",
  title: "Te acompañamos",
  accent: "de la idea al resultado",
  body: [
    "Laura, nuestra asesora comercial y diseñadora de interiores, acompaña cada proyecto para crear muebles 100% personalizados, pensados para tu estilo de vida y tu espacio.",
    "¿Buscas sofá, comedor o una cocina completa? Escríbenos y recibe asesoría antes de decidir.",
  ],
  cta: "Hablar con una asesora",
  image: img("02-cocina-laura"),
  alt: "Laura, asesora y diseñadora de interiores de Romeral, apoyada en una isla de cocina de piedra oscura",
};

export const processSteps = {
  eyebrow: "Proceso",
  title: "Del taller",
  accent: "directo a tu casa",
  steps: [
    { title: "Cuéntanos tu idea", text: "Escríbenos por WhatsApp con fotos o medidas de tu espacio y la pieza que imaginas." },
    { title: "Diseñamos a tu medida", text: "Ajustamos medidas, materiales y acabados contigo. Todo es personalizable." },
    { title: "Fabricamos en nuestro taller", text: "Somos fabricantes: tu mueble se construye en nuestro taller de Medellín." },
    { title: "Llega a tu espacio", text: "Hacemos envíos nacionales. En proyectos completos también hemos viajado a instalar." },
  ],
};

export const faq = {
  eyebrow: "Preguntas frecuentes",
  title: "Lo que más",
  accent: "nos preguntan",
  items: [
    {
      q: "¿Cuánto cuesta un mueble?",
      a: "Cada pieza se fabrica a medida, así que el valor depende de las medidas, los materiales y los acabados. Escríbenos por WhatsApp con la referencia que te gustó y las medidas aproximadas, y te enviamos la cotización.",
      cta: true,
    },
    {
      q: "¿Puedo cambiar medidas, colores o materiales?",
      a: "Sí. Nuestras piezas se piden completamente personalizadas: adaptamos el diseño a tu espacio y a tu estilo.",
    },
    {
      q: "¿Hacen envíos fuera de Medellín?",
      a: "Sí, hacemos envíos nacionales. El costo y el tiempo de entrega se confirman al cotizar según tu ciudad.",
    },
    {
      q: "¿Solo hacen comedores?",
      a: "No. Además de comedores fabricamos sofás y cocinas a medida, y amoblamos espacios completos, como apartamentos para Airbnb.",
    },
    {
      q: "¿Me pueden asesorar si no sé qué necesito?",
      a: "Claro. Nuestra diseñadora de interiores te ayuda a definir la pieza o el espacio antes de fabricar.",
    },
  ],
};

export const contactSection = {
  eyebrow: "Contacto",
  title: "Hagamos realidad",
  accent: "lo que imaginas",
  intro: "Completa los datos y abriremos WhatsApp con tu mensaje listo para enviar. Respondemos con la asesoría y la cotización.",
  furnitureTypes: ["Comedor", "Sala / sofá", "Cocina", "Proyecto completo", "Otro mueble"],
};

export const footer = {
  tagline: "Hacemos los muebles de tus sueños.",
  location: "Medellín, Colombia · Envíos nacionales",
};
