---
sidebar: auto
---

# JavaScript 模拟队列

队列是遵循 FIFO（First In First Out，先进先出，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾

ES6 模拟实现

```javascript
class Queue {
  constructor() {
    this.items = []
  }

  // 入列
  enqueue(element) {
    return this.items.push(element)
  }

  // 出列
  dequeue() {
    return this.items.shift()
  }

  // 查看队列第一个元素
  front() {
    return this.items[0]
  }

  // 查看队列是否为空
  isEmpty() {
    return this.items.length === 0
  }

  // 查看队列元素个数
  size() {
    const items = this.items
    return items.length
  }
}

// 闭包和 WeakMap 实现 items 的不可变性
const Queue = (() => {
  const items = new WeakMap()

  class Queue {
    constructor() {
      items.set(this, [])
    }

    // 入列
    enqueue(element) {
      const q = items.get(this)
      return q.push(element)
    }

    // 出列
    dequeue() {
      const q = items.get(this)
      return q.shift()
    }

    // 查看队列第一个元素
    front() {
      const q = items.get(this)
      return q[0]
    }

    // 查看队列是否为空
    isEmpty() {
      const q = items.get(this)
      return q.length === 0
    }

    // 查看队列元素个数
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
// 辅助类，创建队列元素
class QueueElement {
  constructor(element, priority) {
    this.element = element
    this.priority = priority
  }
}

class PriorityQueue {
  constructor() {
    this.items = []
  }

  enqueue(element, priority) {
    const items = this.items
    const queueElement = new QueueElement(element, priority)

    let added = false // 默认元素未被添加过
    for (let i = 0; i < items.length; i++) {
      if (queueElement.priority < items[i].priority) {
        this.items.splice(i, 0, queueElement)
        added = true
        break
      }
    }

    // 未被添加过就直接添加到队列
    if (!added) {
      items.push(queueElement)
    }
  }

  dequeue() {
    this.items.shift()
  }

  front() {
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  print() {
    const items = this.items
    const length = items.length
    for (let i = 0; i < length; i++) {
      console.log(items[i].element + '-' + items[i].priority)
    }
  }
}

const priorityQueue = new PriorityQueue()
priorityQueue.enqueue('John', 2)
priorityQueue.enqueue('Jack', 1)
priorityQueue.enqueue('Camila', 1)
priorityQueue.enqueue('Camila', 3)
priorityQueue.print()
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
