/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Las fotos de arranque se copian en tiempo de ejecución, así que el rastreo
  // automático no las ve: hay que meterlas en el paquete a mano.
  outputFileTracingIncludes: {
    '/**': ['./seed/**'],
  },
  async redirects() {
    return [
      // El HTML original vivía en la raíz; mantenemos los anclajes vivos.
      { source: '/index.html', destination: '/es', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
