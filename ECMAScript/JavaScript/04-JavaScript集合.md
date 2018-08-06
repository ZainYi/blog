---
sidebar: auto
---

# JavaScript 集合

## 集合

集合是由一组无序且唯一的项组成的。这个数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中

ES5 实现

```javascript
class MySet {
  constructor() {
    this.items = {}
  }

  // 添加新值
  add(value) {
    if (!this.has(value)) {
      this.items[value] = value
      return true
    }

    return false
  }

  // 移出元素
  remove(value) {
    if (this.has(value)) {
      delete this.items[value]
      return true
    }
    return false
  }

  // 是否拥有该值
  has(value) {
    // return value in this.items
    return this.items.hasOwnProperty(value)
  }

  // 清空
  clear() {
    this.items = {}
  }

  // 元素个数
  size() {
    return Object.keys(this.items).length
  }

  // 返回一个包含所有值的数组
  values() {
    let values = []
    const keys = Object.keys(this.items)

    keys.forEach(item => {
      if (this.items.hasOwnProperty(item)) {
        values.push(item)
      }
    })

    return values
  }
}
```

## 集合的操作

- **并集**：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
- **交集**：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合
- **差集**：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
- **子集**：验证一个给定集合是否是另一集合的子集

::: warning 注意
ES6 已经定义了 Set 类
:::
