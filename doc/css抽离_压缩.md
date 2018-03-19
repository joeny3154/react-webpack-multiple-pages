css抽离 & 压缩
=====

我们完成[css loader](./常用laoder配置.md)配置后，css被打包到js bundle中, js执行过程后会通过通过`<style>`标签将css注入到页面中，但这样会导致js中因为存在css代码而体积过大。所以我们通常需要抽离css成独立的文件。

配置方法：在webpack 样式`loader`配置`ExtractTextPlugin.extract()`并在`plugins`添加`ExtractTextPlugin`即可。

``` js
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// ...
module: {
  rules: [
    {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'less-loader', options: { sourceMap: true } }
        ],
        fallback: 'style-loader'
      })
    },
  ]
}

// ...

plugins: {
  new ExtractTextPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css'),
    // 如果设置为`true`。 代码片段中提取CSS会到这个主要的CSS文件，这将导致你的应用程序的所有CSS被预先加载。
    allChunks: false,
  })
}
```

完成以上步骤后已经实现了css抽离，但通过`extract-text-webpack-plugin`抽离css后还存在两个问题：

1. 没有被压缩，体积过大；

2. 可能出现重复样式条目。

一个入口chunk及其子模块`import`了同样的样式文件，抽离后的css中并不会因为重复`import`了而存在重复的模块内容，这里的“存在重复条目”指的是不同的样式文件中可能存在同样的条目，比如：两个css文件中都有`.clearfix { ... }`条目, 使用`extract-text-webpack-plugin` bundle css后，bundle 就会出现重复的`.clearfix { ... }`条目，不能自动剔除。

我们可以通过`optimize-css-assets-webpack-plugin`插件来解决以上问题：

``` js
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

plugins: {
  new ExtractTextPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css'),
    allChunks: false,
  }),
  new OptimizeCSSPlugin({
    cssProcessorOptions: { safe: true, map: { inline: false } }
  })
}
```