---
sidebar: auto
---

# promise/A+ 规范

## 关键字

- `promise` 一个包含了兼容 promise 规范 then 方法的**对象**或**函数**
- `thenable` 一个包含了 then 方法的对象或函数
- `value` 任何 Javascript 值。 (包括 undefined, thenable, promise 等)
- `exception` 由 throw 表达式抛出来的值
- `reason` 一个用于描述 Promise 被拒绝原因的值

## 实现要求

### promise 状态

一个 Promise 必须处在其中之一的状态：

- `pending` 可以转换到 fulfilled 或 rejected 状态
- `fulfilled` 不能转换成任何其它状态；必须有一个值，且这个值不能被改变
- `rejected` 不能转换成任何其它状态；必须有一个原因，且这个值不能被改变

> `值不能被改变`指的是其 identity 不能被改变，而不是指其成员内容不能被改变

### then 方法

一个 Promise 必须提供一个 then 方法来获取其值或原因，Promise 的 then 方法接受两个参数：

```javascript
promise.then(onFulfilled, onRejected)
```

- onFulfilled 和 onRejected 都是可选参数，如果不是一个函数，则忽略
- 如果 onFulfilled/onRejected 是一个函数
  1. 必须在 promise fulfilled/rejected 后调用， 且 promise 的 value 为其第一个参数
  2. 不能在 promise fulfilled/rejected 前调用
  3. 不能被多次调用
- onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行
- onFulfilled 和 onRejected 必须被当做函数调用
- 对于一个 promise，它的 then 方法可以调用多次
  1. 当 promise fulfilled/rejected 后，所有 onFulfilled/OnRejected 都必须按照其注册顺序执行
- then 必须返回一个 promise
  ```javascript
  anotherPromise = promise.then(onFulfilled, onRejected)
  ```
  1. 如果 onFulfilled 或 onRejected 返回了值 x, 则执行 Promise 解析流程[[Resolve]](anotherPromise, x)
  2. 如果 onFulfilled 或 onRejected 抛出了异常 e, 则 anotherPromise 应当以 e 为 reason 被拒绝
  3. 如果 onFulfilled 不是一个函数且 promise 已经 fulfilled，则 anotherPromise 必须以 promise 的值 fulfilled
  4. 如果 OnReject 不是一个函数且 promise 已经 rejected, 则 anotherPromise 必须以相同的 reason 被拒绝

### Promise 解析过程

Promise 解析过程 是以一个 promise 和一个值做为参数的抽象过程，可表示为[[Resolve]](promise, x). 过程如下

1. 如果 promise 和 x 指向相同的值, 使用 TypeError 做为原因将 promise 拒绝
2. 如果 x 是一个 promise, 采用其状态
   - 如果 x 是 pending 状态，promise 必须保持 pending 走到 x fulfilled 或 rejected
   - 如果 x 是 fulfilled 状态，将 x 的值用于 fulfill promise
   - 如果 x 是 rejected 状态, 将 x 的原因用于 reject
3. 如果 x 是一个对象或一个函数
   - 将 then 赋为 x.then
   - 如果在取 x.then 值时抛出了异常，则以这个异常做为原因将 promise 拒绝
   - 如果 then 是一个函数， 以 x 为 this 调用 then 函数， 且第一个参数是 resolvePromise，第二个参数是 rejectPromise，且
     - 当 resolvePromise 被以 y 为参数调用, 执行 [[Resolve]](promise, y)
     - 当 rejectPromise 被以 r 为参数调用, 则以 r 为原因将 promise 拒绝
     - 如果 resolvePromise 和 rejectPromise 都被调用了，或者被调用了多次，则只第一次有效，后面的忽略
       - 如果 resolvePromise 或 rejectPromise 已经被调用了，则忽略它
       - 否则, 以 e 为 reason 将 promise 拒绝
     - 如果 then 不是一个函数，则 以 x 为值 fulfill promise
   - 如果 x 不是对象也不是函数，则以 x 为值 fulfill promise

## 实现

```javascript
const PENDING = 0
const FULFILLED = 1
const REJECTED = 2

function Promise(fn) {
  this.state = PENDING // 状态
  this.value = null // 存储 FULFILLED 或者 REJECTED 状态时的值
  this.handlers = [] // 存储成功或者失败的处理器

  doResolve(fn, resolve, reject)
}

Promise.prototype.fulfill = function(result) {
  this.state = FULFILLED
  this.value = result
  this.handlers.forEach(handle)
  this.handlers = null
}

Promise.prototype.reject = function(error) {
  this.state = REJECTED
  this.value = error
  this.handlers.forEach(handle)
  this.handlers = null
}

Promise.prototype.resolve = function(result) {
  try {
    var then = getThen(result)

    // then 是个方法
    if (then) {
      doResolve(then.bind(result), resolve, reject)
      return
    }
    fulfill(result)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.handle = function(handler) {
  if (this.state === PENDING) {
    handlers.push(handler)
  } else {
    if (this.state === FULFILLED && typeof handler.onFulfilled === 'function') {
      handler.onFulfilled(value)
    }

    if (this.state === REJECTED && typeof handler.onRejected === 'function') {
      handler.onRejected(value)
    }
  }
}

Promise.prototype.done = function(onFulfilled, onRejected) {
  // 保证这个方法是异步的
  setTimeout(function() {
    handle({
      onFulfilled: onFulfilled,
      onRejected: onRejected
    })
  }, 0)
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  const self = this

  return new Promise(function(resolve, reject) {
    return self.done(
      function(result) {
        if (typeof onFulfilled === 'function') {
          try {
            return resolve(onFulfilled(result))
          } catch (error) {
            return reject(error)
          }
        } else {
          return resolve(result)
        }
      },
      function(reason) {
        if (typeof onRejected === 'function') {
          try {
            return resolve(onRejected(reason))
          } catch (error) {
            return reject(error)
          }
        } else {
          return reject(reason)
        }
      }
    )
  })
}

/**
 * 判断 value 是否为 Promise（thenable），如果是，就返回 then 方法
 *
 * @param {Promise|Any} value
 * @returns {Function|Null}
 */
function getThen(value) {
  const t = typeof value

  if (value && (t === 'object' || t === 'function')) {
    const then = value.then
    if (typeof then === 'function') {
      return then
    }
  }

  return null
}

/**
 * 错误行为的处理以及保证 onFulfilled 和 onRejected 只被调用一次
 * @param {Function} fn
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 */
function doResolve(fn, onFulfilled, onRejected) {
  let done = false

  try {
    fn(
      function(value) {
        if (done) return
        done = true
        onFulfilled(value)
      },
      function(reason) {
        if (done) return
        done = true
        onRejected(reason)
      }
    )
  } catch (error) {
    if (done) return
    done = true
    onRejected(error)
  }
}
```
