
'use strict'
const config = require('../config')
const utils = require('./utils')
const path = require('path')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}
module.exports = {
  entry: utils.getEntrys(),
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
  }
}