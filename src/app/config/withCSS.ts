import NextCSS = require('@zeit/next-css');
import { NextConfig, ServerOptions } from 'next';
import * as path from 'path';
import { Configuration } from 'webpack';

const withCSS = (nextConfig: NextConfig = {}): NextConfig =>
  NextCSS({
    ...nextConfig,
    webpack(config: Configuration, options: ServerOptions) {
      config.module = config.module || { rules: [] };

      // Exclude CSS Modules in styles directory
      config.module.rules.map((rule) => {
        if (String(rule.test).includes('css')) {
          rule.exclude = /\/asset\/styles\//;
        }
        return rule;
      });

      // Add css-loader rule without CSS Modules
      config.module.rules.push({
        test: /\.css$/,
        include: path.resolve(__dirname, '../asset/styles'),
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: !options.isServer,
              outputPath: 'static/asset/',
              publicPath: '/_next/static/asset/',
              name: 'common.css',
            },
          },
          'extract-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: options.dev,
              minimize: !options.dev,
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: options.dev },
          },
        ],
      });

      if (nextConfig.webpack) {
        nextConfig.webpack(config, options);
      }

      return config;
    },
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName:
        process.env.NODE_ENV === 'production' ? '[hash:base64:16]' : '[path]___[name]__[local]___[hash:base64:5]',
    },
  });

export default withCSS;
