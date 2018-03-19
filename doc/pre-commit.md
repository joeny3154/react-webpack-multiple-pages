pre-commit 使用
=====

package.json

``` json
"scripts": {
  "lint": "concurrently \"eslint --cache src\""
},
"devDependencies": {
  "pre-commit": "^1.2.2",
},
"pre-commit": [
  "lint"
]
```