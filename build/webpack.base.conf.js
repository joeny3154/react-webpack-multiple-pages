
'use strict'
const config = require('../config')
const utils = require('./utils')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const eslintFormatter = require('react-dev-utils/eslintFormatter')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}
const assetsSubDirectory = 'static'

const assetsPath = function (_path) {
  return path.join(assetsSubDirectory, _path)
}

module.exports = {
  // context: path.resolve(__dirname, '../'),
  entry: {
    // index: ['babel-polyfill', './src/index.js']
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: assetsPath('js/[name].js')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
            },
            loader: 'eslint-loader',
          },
        ],
        include: [resolve('src')],
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        options: {
          cacheDirectory: true // ./node_modules/.cache/babel-loader/
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: 'css-loader', options: { sourceMap: false } },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 9001,
    publicPath: '/',
    // open: true
  },
  optimization: {
    splitChunks: {
      name: 'common'
    },
    runtimeChunk: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: 'template.html',
      title: 'base',
      inject: true
    })
  ]
}