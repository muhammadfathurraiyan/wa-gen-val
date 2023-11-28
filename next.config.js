/** @type {import('next').NextConfig} */
/** @type {import('webpack').DefinePlugin} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer"],
  },
};

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.FLUENTFFMPEG_COV": false,
    }),
  ],
};
