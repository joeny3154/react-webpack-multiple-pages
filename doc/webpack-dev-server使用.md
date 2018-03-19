webpack-dev-server使用
========

``` js
'use strict'

const webpackBaseConf = require('./webpack.base.conf')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackDevConf = merge(webpackBaseConf, {
  devServer: {
    host: 'localhost',
    port: 9001,
    publicPath: '/'
    // quiet: true, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
    // 与监视文件相关的控制选项
    // watchOptions: {
    //   poll: false // 是否开启轮询，此处为 false，如果指定毫秒数，则在指定毫秒时间进行轮询
    // },
    // open: false, // 自动打开浏览器
    // overlay: { warnings: false, errors: true }, // 编译器错误或警告时，是否在浏览器中全屏显示出来。 默认情况下false禁用。 
    // clientLogLevel: 'warning',
    // historyApiFallback: true,
    // hot: true, // 启用webpack模块热替换特性
    // compress: true, // 启用gzip 压缩
    // proxy: {},
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: 'template.html',
      title: 'base',
      inject: true
    })
  ]
})

module.exports = webpackDevConf
```

添加到`package.json`通过`npm run dev`执行

``` json
"scripts": {
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --mode development"
},
```


