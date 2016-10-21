'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDir = path.resolve(__dirname, 'dist');

module.exports = function makeWebpackConfig() {
  let config = {};

  config.entry = {
    'polyfills': './src/polyfills.ts',
    'vendor':    './src/vendor.ts',
    'main':      './src/main.ts'
  };

  config.output = {
    path: buildDir,
    publicPath: '/',
    filename: './js/[name].js'
  };

  config.resolve = {
    extensions: ['', '.ts', '.js', '.json', '.html'],
    modulesDirectories: ['node_modules']
  };

  config.module = {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  };

  config.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ];

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    quiet: true,
    stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
    proxy: {
      '/api': {
        target: 'http://api.myshows.ru',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  };

  return config;
}();
