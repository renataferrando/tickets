/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

// module.exports = {
//     distDir: '.next', // This ensures that the output folder is '.next'
//   };

export default nextConfig;
