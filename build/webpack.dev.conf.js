'use strict'

const webpackBaseConf = require('./webpack.base.conf')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')

const webpackDevConf = merge(webpackBaseConf, {
  devServer: {
    host: 'localhost',
    port: 9001,
    publicPath: '/',
    open: true
  },
  plugins: utils.getHtmlPlugins()
})

module.exports = webpackDevConf