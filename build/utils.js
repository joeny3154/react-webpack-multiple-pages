const path = require('path')
const fs = require('fs')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, '../src')
const entryPath = path.join(srcPath, 'entrys')
const entryFilePath = '**/*.js'

exports.getEntrys = function (options) {
  let entrys = {}
  glob.sync(entryFilePath, { cwd: entryPath }).forEach((file) => {
    let name = file.substr(0, file.length - 3)
    entrys[name] = path.join(srcPath, 'entrys', name)
  })
  console.log('webpack entrys: ', entrys)
  return entrys
}

exports.getHtmlPlugins = function (options) {
  const titleRegExp = /\/\*+\s*title:\s*(.+?)\s*\*+\//
  return glob.sync(entryFilePath, { cwd: entryPath }).map((file) => {
    const match = titleRegExp.exec(fs.readFileSync(path.join(entryPath, file), 'utf8'));
    const title = match ? match[1] : ''
    const name = file.substr(0, file.length - 3)
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: 'template.html',
      title,
      chunks: [name],
      inject: true,
      minify: {
        minifyJS: false
      }
    })
  })
}