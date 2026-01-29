import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default withPayload(nextConfig);
