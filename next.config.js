/** @type {import('next').NextConfig} */
import { DefinePlugin } from "webpack";
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer"],
  },
};

export const plugins = [
  new DefinePlugin({
    "process.env.FLUENTFFMPEG_COV": false,
  }),
];
