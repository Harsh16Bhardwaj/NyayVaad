import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Disable certain features that might scan the filesystem
  productionBrowserSourceMaps: false,
  
  webpack: (config, { isServer }) => {
    // Exclude system directories and sensitive paths from webpack operations
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules|\.git|\.next|\.vscode|Application Data|AppData|Temporary|Local Settings/,
      poll: false,
      aggregateTimeout: 300,
    };
    
    // Prevent scanning outside of the project directory
    config.resolveLoader = {
      ...config.resolveLoader,
      modules: [path.join(process.cwd(), 'node_modules'), 'node_modules'],
    };
    
    return config;
  },
};

export default nextConfig;
