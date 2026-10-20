import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 이 설정이 있어야 빌드 시 'out' 폴더가 생성됩니다.
  basePath: "/ss",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
