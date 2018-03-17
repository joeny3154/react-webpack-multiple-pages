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
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true
    })
  ]
})

module.exports = webpackDevConf
```

# npm 脚本

`package.json`

``` json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
},
```

`npm run dev`:如果你使用的是webpack4, 运行webpack命令需要单独安装`webpack-cli`,否则会看到如下提示：

```
Please install 'webpack-cli' in addition to webpack itself to use the CLI.
-> When using npm: npm install webpack-cli -D
-> When using yarn: yarn add webpack-cli -D
module.js:472
    throw err;
    ^

Error: Cannot find module 'webpack-cli/bin/config-yargs'
```

安装`webpack-cli`即可，`npm install webpack-cli -D`

