/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer"],
  },
};

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "development",
      "process.env.FLUENTFFMPEG_COV": false,
    }),
  ],
};
