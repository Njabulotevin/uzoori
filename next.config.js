/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "wazi-testing-bucket.s3.amazonaws.com"],
  },
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: "/[username]",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
