import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    serverActions:{
      bodySizeLimit:"4mb"
    }
  },
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"zk6cblok9iaqp1v0.public.blob.vercel-storage.com",
      }
    ]
  }
    
};

export default nextConfig;
