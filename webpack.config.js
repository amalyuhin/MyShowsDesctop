'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'dev';
const buildDir = path.resolve(__dirname, 'dist');

let apiHost = env === 'prod'
  ? 'http://api.myshows.ru'
  : 'api'

module.exports = function makeWebpackConfig() {
  let config = {};

  config.entry = {
    'polyfills': './src/polyfills.ts',
    'vendor':    './src/vendor.ts',
    'main':      './src/main.ts'
  };

  config.output = {
    path: buildDir,
    publicPath: env === 'prod' ? buildDir : '/',
    filename: 'js/[name].js'
  };

  config.resolve = {
    extensions: ['.ts', '.js', '.json', '.html'],
    modules: ['node_modules']
  };

  config.module = {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=image/svg+xml"
      }
    ]
  };

  config.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new webpack.DefinePlugin({
      'API_HOST': JSON.stringify(apiHost)
    })
  ];

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    quiet: true,
    stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
    proxy: {
      '/api/*': {
        target: 'http://api.myshows.ru',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        onProxyRes: (proxyRes, req, res) => {
          if (proxyRes.statusCode === 302 && proxyRes.headers['location']) {
            proxyRes.headers['location'] = proxyRes.headers['location'].replace('api.myshows.ru', req.get('host') + '/api');
          }
        }
      }
    }
  };

  return config;
}();
