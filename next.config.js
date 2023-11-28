/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer"],
  },
};

module.exports = {
  // Your other Next.js configuration options go here

  // Add or modify plugins configuration
  webpack: (config, { isServer }) => {
    // Modify the Webpack configuration for both client and server builds

    // Example: Adding a DefinePlugin to set FLUENTFFMPEG_COV to false
    config.plugins.push(
      new this.webpack.DefinePlugin({
        "process.env.FLUENTFFMPEG_COV": false,
      })
    );

    // Additional plugin configurations or modifications can go here

    return config;
  },
};
