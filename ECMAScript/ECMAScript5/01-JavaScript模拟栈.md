---
sidebar: auto
---

# JavaScript 模拟栈

## 栈

栈是一种遵从后进先出（LIFO）原则的有序集合。新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底

### 用 JavaScript 模拟栈

ES5 模拟实现

```javascript
function Stack() {
  this.items = []
}

Stack.prototype = {
  constructor: Stack,

  // 进栈
  push: function(element) {
    return this.items.push(element)
  },

  // 出栈
  pop: function() {
    return this.items.pop()
  },

  // 查看栈顶的元素
  peek: function() {
    const len = this.items.length
    if (len === 0) {
      return
    }
    return this.items[len - 1]
  },

  // 查看栈是否为空
  isEmpty: function() {
    return this.item.length === 0
  },

  // 栈清空
  clear: function() {
    this.items = []
  },

  // 获取栈内元素个数
  size: function() {
    return this.item.length
  }
}
```

ES6 模拟实现

```javascript
class Stack {
  constructor() {
    this.items = []
  }

  push(element) {
    this.items.push(element)
  }

  pop() {
    return this.items.pop()
  }

  peek() {
    const len = this.items.length
    if (len === 0) {
      return
    }
    return this.items[len - 1]
  }

  isEmpty() {
    return this.item.length === 0
  }

  clear() {
    this.items = []
  }

  size() {
    return this.item.length
  }
}
```

缺点：由于是用数组模拟的，`Stack` 类的对象可以在外部任意修改 `items` 这个属性

其他方案：使用闭包和 weakMap 实现变量私有化，只能通过提供的方法访问/操作 `items`

```javascript
const Stack = (() => {
  const items = new WeakMap()

  class Stack {
    constructor() {
      items.set(this, [])
    }

    push(element) {
      const s = items.get(this)
      return s.push(element)
    }

    pop() {
      const s = items.get(this)
      return s.pop()
    }

    peek() {
      const s = items.get(this)
      const len = s.length
      if (len === 0) {
        return
      }
      return s[len - 1]
    }

    isEmpty() {
      const s = items.get(this)
      return s.length === 0
    }

    clear() {
      items.set(this, [])
    }

    size() {
      const s = items.get(this)
      return s.length
    }
  }

  return Stack
})()
```

缺点：

1.  代码比较丑
1.  派生类无法继承私有属性

## 例子

### 进制转换

```javascript
// 10 进制转 2 进制
function divideBy2(decNumber) {
  const remStack = new Stack()
  let rem
  let binaryString = ''

  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / 2)
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString()
  }

  return binaryString
}

// 其他进制 2 8 16
function baseConverter(decNumber, base) {
  const remStack = new Stack()
  let rem
  let baseString = ''
  const DIGITS = '0123456789ABCDEF'

  while (decNumber > 0) {
    rem = Math.floor(decNumber % base)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / base)
  }

  while (!remStack.isEmpty()) {
    baseString += DIGITS[remStack.pop()]
  }

  return baseString
}
```
