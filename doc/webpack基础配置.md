webpack基础配置
=====

在`build/webpack.base.conf.js`添加webpack的基础配置。

我的目标是将bundle资源输出到`dist`目录下，除`.html`外的所有资源存放在`dist/static`,


``` js
const assetsSubDirectory = 'static'
const assetsPath = function (_path) {
  return path.join(assetsSubDirectory, _path)
}

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: assetsPath('[name].js')
  }
}

```

然后通过在命令行输入`webpack --config build/webpack.base.conf.js --mode development`执行配置。

更多[webpack 命令行接口](https://doc.webpack-china.org/api/cli/#%E4%BD%BF%E7%94%A8%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%9A%84%E7%94%A8%E6%B3%95)

添加到`package.json`中：

``` json
"scripts": {
  "base": "webpack --config build/webpack.base.conf.js --mode development",
}
```

### 常用loader配置

1. css

``` js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: "style-loader" },
        { loader: 'css-loader' },
        { loader: 'postcss-loader' },
        { loader: 'less-loader' },
      ]
    },
  ]
},
```

`style-loader`的功能是将CSS通过`<style>`标签注入到html中。
此外还需要安装`flie-loader`来解析css中的url资源引用，如字体、图片，保证打包后的css能正确引用到资源。

我们通过`postcss`来给样式补充兼容前缀，使用在根目录创建`.postcssrc.js`来配置`postcss`:

``` js
module.exports = {
  "plugins": {
    "postcss-import": {},
    "autoprefixer": {}
  }
}
```

在`package.json`添加`browserslist`属性指定目标浏览器

``` json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
],
```

- 其他资源

将小于1000byte的资源返回为一个 DataURL，减少资源请求，否则依然存放在`dist/static`目录下

``` js
module: {
  rules: [
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
```

### babel 配置



### plugins 配置

