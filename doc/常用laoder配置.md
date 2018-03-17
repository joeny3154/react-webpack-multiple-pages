常用laoder配置
====

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