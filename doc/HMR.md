开启webpack模块热替换
=====

`webpack-dev-server`已经实现监听文件变化自动刷新，但是是重新加载整个页面，我们想要的只更新变更内容，这样一来可以不会丢失的应用程序状态，样式调整也更加快速，节省开发时间。这就需要我们启用webpack的模块热替换功能（Hot Module Replacement，简称HMR）

注意：HMR不要在生产环境(production)下启用。

react项目中可以通过`react-hot-loader`、`HotModuleReplacement`来实现HMR，以下是具体的实现步骤：

安装`react-hot-loader`：`npm install --save-dev react-hot-loader`

修改`entry`配置, `react-hot-loader/patch`需要添加到前面

``` js
entry: {
  index: ['react-hot-loader/patch', './src/index.js']
}
```

配置`devServer`, 启动`webpack-dev-server`模块热替换功能：

``` js
devServer: {
  host: 'localhost',
  port: 9001,
  publicPath: '/',
  hot: true,
  // open: true
},
```

在 `.babelrc` 里添加`react-hot-loader/babel`插件

``` json
{  
    "plugins": ["react-hot-loader/babel"]
}  
```

在开发环境webpack配置下添加`HotModuleReplacement`插件:

``` js
plugins: [  
  new webpack.HotModuleReplacementPlugin() //设置这里  
]
```

最后在入口js中把你的根组件包裹在 `<AppContainer>`，当发生更新时所有 `<AppContainer>` 的 `children` 会 reloaded

``` js
import React from 'react';  
import ReactDOM from 'react-dom';  
import HelloWorld from './container/HelloWorld.jsx'
import { AppContainer } from 'react-hot-loader'
  
const render = (App) => {  
    ReactDOM.render(  
        <AppContainer>  
            <App />  
        </AppContainer>,  
    document.getElementById('root')  
    )  
}  
  
render(HelloWorld)  
  
// Hot Module Replacement API   
if (module.hot) {  
    module.hot.accept('./container/HelloWorld', () => {  
        render(require('./container/HelloWorld').default)  
    })  
} 
```

如果你想使用 Webpack 通过 `require.ensure` 切割代码，你必须在 `require.ensure` 代码块增加额外的 `module.hot.accept` 回调, eg:

``` js
require.ensure([], (require) => {
  if (module.hot) {
    module.hot.accept('../components/App', () => {
      loadComponent(require('../components/App').default)
    })
  }
  loadComponent(require('../components/App').default);
})
```