babel配置
====

# babel-loader

``` js
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: [resolve('src')],
      options: {
        cacheDirectory: true // ./node_modules/.cache/babel-loader/
      }
    },
    // ...
  ]
}
```

babel 默认只对语法进行编译，对于新的api它什么都不做，添加`.babelrc`文件，可以通过添加`plugins`选项来扩展babel的功能，但插件的添加很多很复杂，我们可以给babel添加`presets`。`presets`可以简单的理解为一组`plugins`的套餐，这里我们使用`babel-preset-env`, 它本身包含了很多插件，并且可以根据我们指定的运行环境自动激活必要的插件和添加`polyfills`。示例如下：

``` json
{
  "presets": [
    ["env", {
      "useBuiltIns": true,
      "debug": true,
      "targets": {
        "browsers": [
          "> 1%",
          "last 2 versions",
          "not ie <= 8"
        ]
      },
      "modules": false
    }]
  ]
}
```

`babel-preset-env`包含了很多插件，但不包含`polyfill`, 如果需要根据预设自动添加`polyfills`，首先我们需要开启`useBuiltIns: true`, 然后我们需要安装polyfills，这里可以使用`babel-polyfill`：

安装该polyfill: `npm install babel-polyfill --save`, 激活: 在入口js顶部`import 'babel-polyfill'`。

如果你在webpack直接添加到`entry`中，像这样：

``` js
entry: {
  index: ['babel-polyfill', './src/index.js']
},
```
useBuiltIns选项会失效，整个引入了`babel-polyfill`。

值得一提的是开启`useBuiltIns`，虽然可以根据运行环境剔除掉不需要polyfill，但也可能添加了一些你不需要的polyfill。 毕竟它不是根据实际代码中的使用情况去剔除的。

`debug`选项会在编译时输出以下信息：目标环境、使用的的转换规则、使用的插件、使用的polyfill

`modules`是配置你想要将ES6模块编译为哪一种模块系统，有"amd", "commonjs", "systemjs", "umd", 如果不编译, 还是使用ES6模块系统, 则将值声明为false。这里也是考虑到为后面webpack的一些优化配置，这里必须设置为false，后面会讲到。


`babel-preset-env`也不包含`babel-preset-react`，为了解析react代码，需要额外安装配置一下：

``` json
{
  "presets": [
    "react",
    ["env", {
      "useBuiltIns": true,
      "debug": true,
      "targets": {
        "browsers": [
          "> 1%",
          "last 2 versions",
          "not ie <= 8"
        ]
      },
      "modules": false
    }],
  ]
}
```
