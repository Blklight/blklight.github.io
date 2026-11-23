import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// `*.dev.tsx` pages (e.g. the /componentes showcase) exist only outside production builds.
const pageExtensions = isDev ? ["tsx", "ts", "dev.tsx"] : ["tsx", "ts"];
const apiOrigin = process.env.NEXT_PUBLIC_API_URL ?? "";
// Uploaded images' host. Only needed when it is plain http (local MinIO); https is already allowed.
const uploadsOrigin = process.env.NEXT_PUBLIC_UPLOADS_URL ?? "";

// Static CSP without nonce: a nonce forces dynamic rendering and disables PPR (Next CSP guide).
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https: ${uploadsOrigin}`,
  "media-src 'self' blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${apiOrigin}${isDev ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  pageExtensions,
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
