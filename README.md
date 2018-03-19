
使用webpack搭建React多页项目
====

### webpack 基础配置

- [出入口、常用laoder配置](./doc/webpack基础配置.md)

  - webpack 出入口配置

  - 样式处理

  - 其他laoder配置

- [babel配置](./doc/babel配置.md)

- [eslint配置](./doc/eslint配置.md)

### webpack 开发环境配置

- [webpack-dev-server搭建本地资源服务器](./doc/webpack-dev-server使用.md)

- [启用热替换模块](./doc/HMR.md)

- [其他开发体验优化](./doc/开发环境优化配置.md)

- [DefinePlugin配置全局常量](./doc/全局常量配置)

### webpack 生产环境配置

- [资源持久化缓存方案](./doc/webpack资源持久化缓存方案.md)

- *css抽离 ExtractTextPlugin* 

- *抽离css压缩 OptimizeCSSPlugin* 

- *静态资源管理 CopyWebpackPlugin* 

- *作用域提升优化js运行速度 ModuleConcatenationPlugin* 

- build 脚本

在 production mode 默认

关闭 in-memory caching
开启 NoEmitOnErrorsPlugin
开启 ModuleConcatenationPlugin
开启 optimization.minimize 

- *js压缩 UglifyJsPlugin* 

- *gzip压缩 CompressionWebpackPlugin*

- *可视化分析 BundleAnalyzerPlugin（webpack-bundle-analyzer*

### webpack 多页面配置

- [入口配置](./doc/多页面路口配置.md)

- *路由配置*

- *redux配置*