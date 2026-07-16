const githubPages = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(githubPages ? { output: 'export', trailingSlash: true, basePath, assetPrefix: basePath || undefined } : {}),
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  ...(!githubPages ? { async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      }
    ];
  } } : {})
};

export default nextConfig;
