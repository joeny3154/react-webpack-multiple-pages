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

项目根目录创建`.eslintrc.json`，添加eslint配置：

``` json
{
  // ESLint 默认使用Espree作为其解析器, Babel-ESLint 是对Babel解析器的包装使其与 ESLint 兼容
  // 因为我们使用es6, 需要安装babel-eslint, 否则很多语法会报错
  "parser": "babel-eslint",
  "parserOptions": {
    // sourceType：默认为 "script"，我们这里使用ECMAScript模块，设置为"module"
    "sourceType": "module"
  },
  "plugins": [
    // eslint-plugin-react
    "react"
  ],
  // 扩展配置规则
  "extends": [
    // "eslint:recommended", // eslint 推荐的扩展配置
    "plugin:react/recommended" // eslint-plugin-react推荐的扩展配置
  ],
  "env": {
    "browser": true,
  },
  "rules": {}
}
```

通过配置`extends`选项添加以下预设的规则套餐，比如添加`eslint-plugin-react`插件中推荐规则：`"extends": ["plugin:react/recommended"]`

通过设置`rules`选项修改预设的规则，但设置规则 ID 等于以下的值之一

- "off" 或 0 - 关闭规则

- "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)

- "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

``` json
{
  "rules": {
    "react/jsx-key": 2
  }
}
```

`eslint-plugin-react`更多的详细配置和支持的rules列表[查看这里](https://github.com/yannickcr/eslint-plugin-react)

以上配置我们是通过在webpack编译过程中实时进行校验，很多时候我们也会在`git commit`之前进行校验，这样我们还需要配置`.eslintignore`忽略提交中不需要校验的文件。

配置`.eslintignore`:

```
dist
config
build
```

引入`pre-commit`可以实现`commit`之前校验，这里不具体说明了, 可以[查看这里](./pre-commit.md)。

