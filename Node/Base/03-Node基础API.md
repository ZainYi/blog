---
sidebar: auto
---

# Node 基础 API

Node 基础 API 是 Node 最核心的 API，长期稳定，API 使用方法不会经常改变，此处对基础 API 做一个备忘录以及常用的参数说明

## 全局对象

```javascript
// 打印字符
console.log('字符')

// 定时器，n 秒之后调用函数
setTimeout(() => {}, 2000)

// 定时器，每隔 n 秒调用函数
setInterval(() => {}, 2000)

__dirname // 当前文件所在目录在磁盘中的绝对路径

__filename // 当前文件在磁盘中的绝对路径

module.exports // 导出模块，require 导入的也是这个对象

exports // 导出模块，这只是 module.exports 的一个引用，我一般都用 module.exports

require // 导入模块，以同步的方式

process // 当前进程的一些信息

// 其他全局对象
```

## 模块

- CommonJS： 每个文件就是一个模块，不用 define 进行定义（Node.js）
- AMD： 使用 define 定义一个模块，讲究提前依赖 （浏览器）
- CMD： 使用 define 定义模块，将就就近依赖 （浏览器）

```javascript
// a.js 导出一个对象
const person = {
  name: 'Jon',
  age: 16,
  sex: 'male'
}

module.exports = {
  person
}

// b.js 直接导出一个函数
function func() {
  console.log('b')
}

module.exprots = func

// c.js
const person = require('./a.js')
const func = require('./b.js')
```

## 事件

```javascript
const events = require('events') // 核心库
const egEmitter = new events.EventEmitter()

// 监听事件
egEmitter.on('someEvent', message => {
  console.log(message)
})

// 手动触发事件
egEmitter.emit('someEvent', 'msg')
```

## 读写文件

```javascript
const fs = require('fs')

// 异步读文件
fs.readFile('./example.txt', function(err, data) {
  console.log(data.toString())
})

// 同步读文件
const data = fs.readFileSync('./example.txt', 'utf8')
console.log(data)

// 异步写文件
fs.writeFile('write.txt', function(err) {
  if (err) throw err
})

fs.writeFileSync('write.txt')
```

## 文件夹操作

```javascript
// 异步删除文件
fs.unlink('write.txt', function(err) {
  console.log(err)
})

// 同步删除文件
fs.unlinkSync('write.txt')

// 异步创建文件夹
fs.mkdir('file', function(err) {
  if (err) throw err
})

// 同步创建文件夹
fs.mkdirSync('file')

// 同步删除文件夹
fs.rmdirSync('file')

// 异步删除文件夹
fs.rmdir('file', function(err) {
  if (err) throw err
})
```

## 流和管道

```javascript
// 读一个文件流
const fs = require('fs')

const myReadStream = fs.createReadStream(__dirname + '\\example.txt', 'utf8')

let data = ''
myReadStream.on('data', function(chunk) {
  console.log('new chunk received')
  console.log(chunk)
  data += chunk
})
myReadStream.on('end', function() {
  console.log(data.toString())
})

// 写入流
const fs = require('fs')

const myReadStream = fs.createReadStream(__dirname + '\\example.txt', 'utf8')
const myWirteStream = fs.createWriteStream(__dirname + '\\writeStream.txt')

let data = ''

myReadStream.on('data', function(chunk) {
  myWirteStream.write(chunk)
})

myReadStream.on('end', function() {
  myWirteStream.end()
})

myWirteStream.on('finish', function() {
  console.log('finish')
})

// 管道
const fs = require('fs')

const myReadStream = fs.createReadStream(__dirname + '\\example.txt', 'utf8')
const myWirteStream = fs.createWriteStream(__dirname + '\\writeStream.txt')

let data = ''

myReadStream.pipe(myWirteStream)
```

## http 模块

```javascript
const http = require('http')

const server = http.createServer(function(req, res) {
  res.end('hello')
})
server.listen(3000, function() {
  console.log('Server is running at http://localhost:3000')
})
```
