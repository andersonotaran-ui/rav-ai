/** @type {import('next').NextConfig} */
const nextConfig = {
  // "standalone" gera um bundle mínimo com apenas as dependências
  // realmente usadas em runtime — essencial para a imagem Docker
  // final ser pequena (ver apps/web/Dockerfile).
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
