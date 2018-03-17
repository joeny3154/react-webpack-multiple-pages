
# webpack-cli

webpack 4 中，如果要使用 webpack cli 命令，需要单独再安装 webpack-cli


# moda

以往的项目使用 webpack3 脚手架生成项目初始模板都会有两个甚至三个配置文件，比如
webpack.base.conf.js、webpack.prod.conf.js、webpack.dev.conf.js 而现在可以做到一个配置文件都不需要，直接在启动命令中传入参数 --mode development | production 达到区分不同模式的效果。

```
"scripts": {
     "dev": "webpack --mode development",
     "build": "webpack --mode production"
 },
 ```


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
