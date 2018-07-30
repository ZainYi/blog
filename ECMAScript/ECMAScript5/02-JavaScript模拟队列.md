---
sidebar: auto
---

# JavaScript 模拟队列

队列是遵循 FIFO（First In First Out，先进先出，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾

ES5 模拟实现

```javascript
function Queue() {
  this.items = []
}

// 入列
Queue.prototype.enqueue = function(element) {
  this.items.push(element)
}

// 出列
Queue.prototype.dequeque = function() {
  this.items.shift()
}

// 查看队列第一个元素
Queue.prototype.front = function() {
  return this.items[0]
}

// 查看队列是否为空
Queue.prototype.isEmpty = function() {
  return this.items.length === 0
}

// 查看队列元素个数
Queue.prototype.size = function() {
  return this.items.length
}
```

ES6 模拟实现

```javascript
const Queue = (() => {
  const items = new WeakMap()

  class Queue {
    constructor() {
      items.set(this, [])
    }

    enqueue(element) {
      const q = items.get(this)
      return q.push(element)
    }

    dequeue() {
      const q = items.get(this)
      const r = q.shift()
      return r
    }

    front() {
      const q = items.get(this)
      return q[0]
    }

    isEmpty() {
      const q = items.get(this)
      return q.length === 0
    }

    size() {
      const q = items.get(this)
      return q.length
    }
  }

  return Queue
})()
```

## 优先队列

优先队列：元素的添加和移除是基于优先级的

实现一个优先队列，有两种选项：设置优先级，然后在正确的位置添加元素；或者用入列操作添加元素，然后按照优先级移除它们

```javascript
function PriorityQueue() {
  let items = []
  function QueueElement(element, priority) {
    this.element = element
    this.priority = priority
  }
  this.enqueue = function(element, priority) {
    let queueElement = new QueueElement(element, priority)
    let added = false
    for (let i = 0; i < items.length; i++) {
      if (queueElement.priority < items[i].priority) {
        items.splice(i, 0, queueElement)
        added = true
        break
      }
    }

    // 队列为空可以直接添加到队列
    if (!added) {
      items.push(queueElement)
    }
  }
  // 其他方法和默认的Queue实现相同
}
```

## 循环队列

循环队列的一个典型列子——击鼓传花游戏

```javascript
function hotPotato(nameList, num) {
  // 利用上面的队列类创建队列
  const queue = new Queue()

  // 所有人入列
  for (let i = 0; i < nameList.length; ++i) {
    queue.enqueue(nameList[i])
  }

  let eliminated = ''

  // 传花淘汰人
  while (queue.size() > 1) {
    for (let i = 0; i < num; ++i) {
      queue.enqueue(queue.dequeue())
    }

    eliminated = queue.dequeue()
    console.log(`${eliminated} 淘汰`)
  }

  // 最后的胜者
  return queue.dequeue()
}

let names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
let winner = hotPotato(names, 7)
console.log('The winner is: ' + winner)
```
