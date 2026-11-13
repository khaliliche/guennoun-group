/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site statique : aucun serveur requis, déployable sur n'importe quel hébergement.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
