import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
