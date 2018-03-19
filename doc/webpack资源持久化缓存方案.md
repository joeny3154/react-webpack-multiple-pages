
webpack javscript 持久化缓存方案
=====

webpack可以对chunk资源设置`chunkhash`: 为每个 chunk 资源都生成与其内容相关的 hash 摘要，为不同的资源设置不同的hash。
但这只是持久化缓存的第一步，我们还要避免未修改chunk的hash更改，这样才能更好的利用浏览器缓存。

首先需要了解如何生成hash:

- js资源的`[chunkhash]`由webpack生成

- 图片、字体、媒体资源等文件的`[hash]`由 `file-loader` 生成

- 提取的css资源的`[contenthash]`由 `extract-text-webpack-plugin` 生成

``` js
output: {  
  filename: utils.assetsPath('js/[name].[chunkhash].js'),
  chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
},
module: {  
  rules: [
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
  ]
},
plugins: [  
  new ExtractTextPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css')
  }),
]
```

tip: `url-loader`是`file-loader`的上层封装, 包含了`file-loader`

`chunkhash`会因为内容的改变而改变，所以想好实现js的缓存首先需要根据模块的更改频率区分出来，这就可以通过CommonsChunkPlugin来实现。

因为webpack4中已经移除了`CommonsChunkPlugin`, 我们依然区分webpack4及低于此版本下的解决方案。同时因为我对webpack4之前的解决方案比较清楚，就先介绍`< webpack 4`的配置方案。

# < webpack4 

项目中的代码包含了业务模块、可复用的自定义通用工具模块和ui组件等、第三方库（vendor）。因为它们的更改几率是不同的，所以我们首先的目标就是要把它们三者分开才能有效的利用浏览器缓存。

vendor的抽离可以分显示/隐式指明vendor两种方案：

1. 显示指明vendor

首先我们应该把业务模块和公共模块区分开，我们把所有入口chunk做为公共模块的来源做一次抽离：

``` js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({ name: "commons" })
]
```

现在commons chunk中公共代码包含了自定义通用模块，还包含了第三方库 （vendor chunk), 由于第三方库基本不会变更，为了更好的缓存第三方库，我们再剥离出vendor成独立的chunk:

首先在`entry`选项中明确指明第三库列表：

``` js
entry: {
  vendor: ["react", "jquery", "other-lib"],
}

new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: Infinity,
})
```

`minChunks`设置为`Infinity`是必须的，这样会立即生成vendor chunk，如此一来，随着entry chunk越来越多, entry chunk间的再产生共享模块也不会打包进vendor chunk。

以上步骤虽然分离业务代码和第三方库, entry bundle会随着自身的新增内容的修改而发生变化。但entry chunk中引入其他的模块，比如添加一个`print.js`

``` js
// print.js
export default function print(text) {
  console.log(text);
}

```

``` js
// main.js
import Print from './print'
Print('Hello webpack')
```

再次运行构建，然后我们期望的是 entry 的 hash 发生变化, 然后 commons bundle， vendor bundle， main bundle 都发生了更改，这是因为：

- `main` bundle 会随着自身的新增内容的修改，而发生变化。

- `vendor` bundle 会随着自身的 `module.id` 的修改，而发生变化。

- `commons` bundle 包含了`boilerplate`（webpack 运行时的引导代码）, 因为当前包含一个新模块的引用导致`boilerplate`中模块清单（`manifest`）更改，从而使commons bundle发生变化。

`vendor` bundle因为`module.id`更改而发变化，那`module.id`是怎么修改的呢？

chunk 的生成涉及到依赖解析和模块 id 分配，这是实质上没有变化的 chunk 文件无法稳定的`chunkhash`根源，默认模块的 id 是 webpack 根据依赖的收集顺序递增的正整数，这种 id 分配方式不太稳定，因为修改一个被依赖较多的模块，依赖这个模块的 chunks 内容均会跟着模块的新 id 一起改变。

vendor 的 hash 发生变化是我们要修复的, 我们可以使用两个插件来解决：

第一个插件是`NamedModulesPlugin`，将使用模块的相对路径代替数字id标识。虽然此插件有助于在开发过程中输出结果的可读性，然而执行时间会长一些。
开发模式，它可以让 `webpack-dev-server` 和 HMR 进行热更新时在控制台输出模块路径而不是纯数字；生产构建环境，它可以避免因内容修改导致的 id 变化，从而实现持久化缓存。
但它的缺点是 `module.id`替换为模块相对路径后，导致构建出来的 chunk 会充满各种路径，使文件增大；模块路径会泄露，可能导致安全问题。

第二个选择是使用 `HashedModuleIdsPlugin`，仅用于生产环境, 此插件在`NamedModulesPlugin`的基础上根据模块的相对路径默认生成一个四位数的`hash`作为模块id(`module.id`)，不仅可以实现持久化缓存，同时还避免了它引起的两个问题（文件增大，路径泄露）

``` js
plugins: [
  new webpack.HashedModuleIdsPlugin()
]
```

2. 隐式vendor

``` js
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks (module) {
    return (
      module.resource &&
      /\.js$/.test(module.resource) &&
      module.resource.indexOf(
        path.join(__dirname, '../node_modules')
      ) === 0
    )
  }
})
```

之前已经说过webpack 在入口 chunk 中，都会包含了样板代码(boilerplate)，特别是 runtime 和 manifest。通过指定 entry 配置中未用到的名称, 通常使用`runtime` 或者 `manifest`，`CommonsChunkPlugin`会自动将我们需要的内容提取到单独的包中：
``` js
new webpack.optimize.CommonsChunkPlugin({
  name: 'manifest'
})
```

最后同样的问题，新模块的引入会导致id 分配方式不太稳定，我们还需要`HashedModuleIdsPlugin`对模块路径生成4位数的hash作为`module.id`，避免非变更的 chunks 内容跟随模块的新 id变化，从而影响非变更模块的持久化缓存。

### 抽离额外的异步公共chunk

使用代码拆分功能，一个chunk的多个子块会有公共的依赖。为了防止重复，可以将这些公共模块移入父块。这会减少总体的大小。缺点是会对首次加载时间产生不良影响。

``` js
new webpack.optimize.CommonsChunkPlugin({
  children: true,
})
```

为了避免上面的缺陷，我们不再把一个chunk的多个子块的公共依赖模块移动到父chunk（增加初始加载时间），而是使用新的异步加载的额外公共块。当下载额外的块时，它将自动并行下载。

``` js
new webpack.optimize.CommonsChunkPlugin({
  name: "app",
  children: true,
  async: true,
  minChunks: 3,
})
```

# webpack4

