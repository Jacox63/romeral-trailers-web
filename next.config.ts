import type { NextConfig } from "next";

// Subruta opcional (p. ej. GitHub Pages de proyecto: "/romeral-trailers-web"). Vacío = raíz.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  basePath,
  // Exportación estática: genera out/ desplegable en cualquier hosting.
  output: "export",
  // El optimizador por defecto no funciona en export estático; las imágenes ya se
  // entregan optimizadas (WebP) por scripts/optimize-images.mjs.
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
