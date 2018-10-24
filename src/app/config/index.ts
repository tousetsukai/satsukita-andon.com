import withTypescript = require('@zeit/next-typescript');
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import { ServerOptions } from 'next';
import { Configuration } from 'webpack';
import withCSS from './withCSS';

export = withTypescript(
  withCSS({
    // relative path from next.config.js
    distDir: '../../dist/functions/next',
    webpack(config: Configuration, options: ServerOptions) {
      config.plugins = config.plugins || [];

      if (options.dev && options.isServer) {
        config.plugins.push(
          new ForkTsCheckerWebpackPlugin({
            tsconfig: '../../tsconfig.json',
          }),
        );
      }

      return config;
    },
  }),
);
