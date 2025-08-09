/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false, // this line turns Strict Mode off in dev

  eslint: {
    ignoreDuringBuilds: true, // Allow deploys even if ESLint finds problems
  },
  typescript: {
    ignoreBuildErrors: true, // Allow deploys even if TS has type errors
  },
};