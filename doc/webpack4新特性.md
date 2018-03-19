
# webpack-cli

https://github.com/webpack/webpack/issues/6244

webpack 4 中，如果要使用 webpack cli 命令，需要单独再安装 webpack-cli, 否则会看到如下提示：

```
Please install 'webpack-cli' in addition to webpack itself to use the CLI.
-> When using npm: npm install webpack-cli -D
-> When using yarn: yarn add webpack-cli -D
module.js:472
    throw err;
    ^

Error: Cannot find module 'webpack-cli/bin/config-yargs'
```

安装`webpack-cli`: `npm install webpack-cli -D`

# mode

以往的项目使用 webpack3 脚手架生成项目初始模板都会有两个甚至三个配置文件，比如
webpack.base.conf.js、webpack.prod.conf.js、webpack.dev.conf.js 而现在可以做到一个配置文件都不需要，直接在启动命令中传入参数 --mode development | production 达到区分不同模式的效果。


```
"scripts": {
     "dev": "webpack --mode development",
     "build": "webpack --mode production"
 },
 ```


mode分为development/production,默认为production

``` js
//parent chunk中解决了的chunk会被删除
optimization.removeAvailableModules:true
//删除空的chunks
optimization.removeEmptyChunks:true
//合并重复的chunk
optimization.mergeDuplicateChunks:true
```

development

``` js
//调试
devtool:eval
//缓存模块, 避免在未更改时重建它们。
cache:true
//缓存已解决的依赖项, 避免重新解析它们。
module.unsafeCache:true
//在 bundle 中引入「所包含模块信息」的相关注释
output.pathinfo:true
//在可能的情况下确定每个模块的导出,被用于其他优化或代码生成。
optimization.providedExports:true
//找到chunk中共享的模块,取出来生成单独的chunk
optimization.splitChunks:true
//为 webpack 运行时代码创建单独的chunk
optimization.runtimeChunk:true
//编译错误时不写入到输出
optimization.noEmitOnErrors:true
//给模块有意义的名称代替ids
optimization.namedModules:true
//给模chunk有意义的名称代替ids
optimization.namedChunks:true
```

production 

``` js
//性能相关配置
performance:{hints:"error"....}
//某些chunk的子chunk已一种方式被确定和标记,这些子chunks在加载更大的块时不必加载
optimization.flagIncludedChunks:true
//给经常使用的ids更短的值
optimization.occurrenceOrder:true
//确定每个模块下被使用的导出
optimization.usedExports:true
//识别package.json or rules sideEffects 标志
optimization.sideEffects:true
//尝试查找模块图中可以安全连接到单个模块中的段。- -
optimization.concatenateModules:true
//使用uglify-js压缩代码
optimization.minimize:true
```

webpack运行时还会根据mode设置`process.env.NODE_ENV`

 #  删除 CommonsChunkPlugin

 ``` js
 optimization: {
     splitChunks: {
        chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async" 
        minSize: 0, // 最小尺寸，默认0
        minChunks: 1, // 最小 chunk ，默认1
        maxAsyncRequests: 1, // 最大异步请求数， 默认1
        maxInitialRequests : 1, // 最大初始化请求书，默认1
        name: function(){}, // 名称，此选项可接收 function
        cacheGroups:{ // 这里开始设置缓存的 chunks
            priority: 0, // 缓存组优先级
            vendor: { // key 为entry中定义的 入口名称
                chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步) 
                test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
                name: "vendor", // 要缓存的 分隔出来的 chunk 名称 
                minSize: 0,
                minChunks: 1,
                enforce: true,
                maxAsyncRequests: 1, // 最大异步请求数， 默认1
                maxInitialRequests : 1, // 最大初始化请求书，默认1
                reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
            }
        }
    },
    runtimeChunk: true
 },
 ```



https://funteas.com/topic/5a8732640904506b0150c27b
https://github.com/dwqs/blog/issues/60
https://segmentfault.com/a/1190000013476837
