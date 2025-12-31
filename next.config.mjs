// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export", // ✅ enables static HTML export (creates /out folder)
//   images: {
//     unoptimized: true, // ✅ disables Next.js Image Optimization (needed for export)
//     domains: ["lh3.googleusercontent.com"], // ✅ keep your existing domain
//   },
//   env: {
//     NEXT_PUBLIC_SITE_URL: "https://interio.weighbridgeindia.co.in",
//   },
//   trailingSlash: true,
//   reactStrictMode: false,
// };

// export default nextConfig;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // Replace with your actual domains
        port: "", // Optional: e.g., '3000' if needed
        pathname: "/**", // Allows all paths; restrict if possible (e.g., '/images/**')
      },
      // Add more patterns as needed
    ],
  },
  env: {
    API_URL: "http://localhost:3000/api",
  },
  reactStrictMode: false,
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export", // This triggers static export to /out
//   images: {
//     unoptimized: true, // Required for static export
//     domains: ["lh3.googleusercontent.com"],
//   },
//   env: {
//     NEXT_PUBLIC_SITE_URL: "https://interio.weighbridgeindia.co.in",
//   },
//   trailingSlash: true, // Helps with routing
//   reactStrictMode: false,
// };

// export default nextConfig;
