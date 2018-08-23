---
sidebar: auto
---

# 简易的 EventEmitter

Node.js 中的许多核心模块派发或接收不同的事件。它有一个 EventEmitter 的实现，是一个发布 - 订阅模式。这与浏览器 DOM 事件非常相似，语法略有不同，理解它最好的方式就是亲自来实现一下

```javascript
class EventEmitter {
  constructor() {
    this.events = {}
  }

  // 检测事件是否初始化
  checkExistence(event) {
    // 不存在事件就初始化
    if (!this.events[event]) {
      this.events[event] = [] // 用来存订阅者
    }
  }

  // 绑定执行一次的事件
  once(event, cb) {
    this.checkExistence(event)

    const cbWithRemove = (...args) => {
      cb(args)
      this.off(event, cbWithRemove)
    }

    this.events[event].push(cbWithRemove)
  }

  // 绑定事件
  on(event, cb) {
    this.checkExistence(event)
    this.events[event].push(cb)
  }

  // 取消绑定
  off(event, cb) {
    this.checkExistence(event)

    // 移除掉绑定的回调
    this.events[event] = this.events[event].filter(
      registeredCallback => registeredCallback !== cb
    )
  }

  // 触发事件
  emit(event, ...args) {
    this.checkExistence(event)
    this.events[event].forEach(cb => cb(...args))
  }
}

const event = new EventEmitter()
event.on('click', a => {
  console.log(a)
})

event.emit('click', 11)
```

> 此实现为 EventEmitter 最简易的实现，实际上是为了展示发布-订阅者模式
