'use strict'

const webpackBaseConf = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge  = require('webpack-merge')
const webpack  = require('webpack')
const utils = require('./utils')
const config = require('../config')
const path = require('path')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}

const webpackDevConf = merge(webpackBaseConf, {
  devServer: {
    host: 'localhost',
    port: 9001,
    publicPath: '/',
    hot: true,
    // open: true
  },
  // optimization: {
  //   splitChunks: {
  //     name: 'common'
  //   },
  //   runtimeChunk: true
  // },
  plugins: [
    // plugins: utils.getHtmlPlugins()
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: 'template.html',
      title: 'base',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = webpackDevConf