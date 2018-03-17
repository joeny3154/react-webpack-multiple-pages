'use strict'

const webpackBaseConf = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge  = require('webpack-merge')
const utils = require('./utils')
const config = require('../config')
const path = require('path')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}

const webpackDevConf = {
  entry: {
    index: './src/index.js'
  },
  // entry: utils.getEntrys(),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        options: {
          // ./node_modules/.cache/babel-loader/
          cacheDirectory: true
        }
      },
    ]
  },
  devServer: {
    host: 'localhost',
    port: 9001,
    publicPath: '/',
    open: true
  },
  plugins: utils.getHtmlPlugins()
}

module.exports = webpackDevConf