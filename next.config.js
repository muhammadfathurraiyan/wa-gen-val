const webpack = require("webpack");
const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer"],
  },
};

let resolveFfmpegPlugin = {
  name: "resolveFfmpeg",
  setup(build) {
    build.onResolve({ filter: /lib-cov\/fluent-ffmpeg/ }, (args) => {
      // fix https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/573
      const actualPath = path.join(args.resolveDir, "lib", "fluent-ffmpeg");
      return { path: actualPath };
    });
  },
};

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin({
      FLUENTFFMPEG_COV: "",
    }),
  ],
};
