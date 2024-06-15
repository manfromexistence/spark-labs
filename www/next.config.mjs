// // /** @type {import('next').NextConfig} */
// // const nextConfig = {}

// // module.exports = nextConfig
// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
//  * for Docker builds.
//  */

// /** @type {import("next").NextConfig} */
// const config = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "utfs.io",
//         },
//         {
//           protocol: 'https',
//           hostname: 'img.clerk.com',
//           port: '',        
//         },
//       ],
//       unoptimized: true,
//     },
//   }
  
//   module.exports = config
  // import { createContentlayerPlugin } from "next-contentlayer"

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//     ],
//   },
//   redirects() {
//     return [
//       {
//         source: "/components",
//         destination: "/docs/components/accordion",
//         permanent: true,
//       },
//       {
//         source: "/docs/components",
//         destination: "/docs/components/accordion",
//         permanent: true,
//       },
//       {
//         source: "/examples",
//         destination: "/examples/mail",
//         permanent: false,
//       },
//       {
//         source: "/docs/primitives/:path*",
//         destination: "/docs/components/:path*",
//         permanent: true,
//       },
//       {
//         source: "/figma",
//         destination: "/docs/figma",
//         permanent: true,
//       },
//       {
//         source: "/docs/forms",
//         destination: "/docs/components/form",
//         permanent: false,
//       },
//       {
//         source: "/docs/forms/react-hook-form",
//         destination: "/docs/components/form",
//         permanent: false,
//       },
//     ]
//   },
// }

// const withContentlayer = createContentlayerPlugin({
//   // Additional Contentlayer config options
// })

// export default withContentlayer(nextConfig)
// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

// /** @type {import("next").NextConfig} */
// const config = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "utfs.io",
//       },
//       {
//         protocol: 'https',
//         hostname: 'img.clerk.com',
//         port: '',
//       },
//     ],
//     unoptimized: true,
//   },
// }

// module.exports = config

// import { createContentlayerPlugin } from "next-contentlayer"

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "utfs.io",
//       },
//       {
//         protocol: 'https',
//         hostname: 'img.clerk.com',
//         port: '',
//       },
//     ],
//   },
//   // redirects() {
//   //   return [
//   //     {
//   //       source: "/components",
//   //       destination: "/docs/components/accordion",
//   //       permanent: true,
//   //     },
//   //     {
//   //       source: "/docs/components",
//   //       destination: "/docs/components/accordion",
//   //       permanent: true,
//   //     },
//   //     {
//   //       source: "/examples",
//   //       destination: "/examples/mail",
//   //       permanent: false,
//   //     },
//   //     {
//   //       source: "/docs/primitives/:path*",
//   //       destination: "/docs/components/:path*",
//   //       permanent: true,
//   //     },
//   //     {
//   //       source: "/figma",
//   //       destination: "/docs/figma",
//   //       permanent: true,
//   //     },
//   //     {
//   //       source: "/docs/forms",
//   //       destination: "/docs/components/form",
//   //       permanent: false,
//   //     },
//   //     {
//   //       source: "/docs/forms/react-hook-form",
//   //       destination: "/docs/components/form",
//   //       permanent: false,
//   //     },
//   //   ]
//   // },
// }

// const withContentlayer = createContentlayerPlugin({
//   // Additional Contentlayer config options
// })

// export default withContentlayer(nextConfig)












/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
      },
      
    ],
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
    unoptimized: true,
  },
}

export default config;
