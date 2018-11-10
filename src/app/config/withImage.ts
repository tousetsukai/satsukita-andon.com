import { NextConfig, ServerOptions } from 'next';
import { Configuration } from 'webpack';

const withImage = (nextConfig: NextConfig = {}): NextConfig => ({
  ...nextConfig,
  webpack(config: Configuration, options: ServerOptions) {
    config.module = config.module || { rules: [] };

    config.module.rules.push({
      test: /\.(gif|png|jpe?g|svg|webp)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            emitFile: !options.isServer,
            outputPath: 'static/img',
            publicPath: '/_next/static/img',
            name: '[hash].[ext]',
            limit: 1000,
          },
        },
      ],
    });

    if (nextConfig.webpack) {
      nextConfig.webpack(config, options);
    }
    return config;
  },
});

export default withImage;
