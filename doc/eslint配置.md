eslint配置
=====


`npm i --save-dev eslint eslint-loader`

配置`eslint-loader`:

``` js
const eslintFormatter = require('react-dev-utils/eslintFormatter');

{
  test: /\.(js|jsx)$/,
  // 强制配置成 前置loader，以便能检查源文件，而不是被babel-loader修改后的文件
  enforce: 'pre',
  use: [
    {
      options: {
        // eslint格式化程序
        formatter: eslintFormatter,
      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  include: [resolve('src')],
},
```

项目根目录添加`.eslintrc.json`文件，添加

``` json
{
  // ESLint 默认使用Espree作为其解析器, Babel-ESLint 是对Babel解析器的包装使其与 ESLint 兼容
  // 因为我们使用es6, 需要安装babel-eslint,否则很多语法会报错
  "parser": "babel-eslint",
  "parserOptions": {
    // sourceType：默认为 "script"，我们这里使用ECMAScript模块，设置为"module"
    "sourceType": "module"
  },
  "plugins": [
    // eslint-plugin-react
    "react"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "env": {
    "browser": true,
    "es6": true
  },
  "rules": {}
}
```

识别react中的一些语法检验

``` json
{
  "rules": {
    "no-multi-spaces": 1,
    "react/jsx-space-before-closing": 1,        // 总是在自动关闭的标签前加一个空格，正常情况下也不需要换行
    "jsx-quotes": 1,
    "react/jsx-closing-bracket-location": 1,    // 遵循JSX语法缩进/格式
    "react/jsx-boolean-value": 1,               // 如果属性值为 true, 可以直接省略
    "react/no-string-refs": 1,      // 总是在Refs里使用回调函数
    "react/self-closing-comp": 1,    // 对于没有子元素的标签来说总是自己关闭标签
    "react/jsx-no-bind": 1,          // 当在 render() 里使用事件处理方法时，提前在构造函数里把 this 绑定上去
    "react/sort-comp": 1,            // 按照具体规范的React.createClass 的生命周期函数书写代码
    "react/jsx-pascal-case": 1        // React模块名使用帕斯卡命名，实例使用骆驼式命名
  }
}
```


eslint官方给出的一些有关react配置的文档: https://github.com/yannickcr/eslint-plugin-react

https://www.jianshu.com/p/edda91891fb2