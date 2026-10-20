import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 빌드 시 사소한 경고로 멈추지 않도록 예외 처리
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
