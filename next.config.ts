import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  webpack(config) {
    // Prêt pour l'intégration Rust/WASM
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
};

export default withPWA(nextConfig);
