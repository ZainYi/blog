---
sidebar: auto
---

# TypeScript 基础扫盲

TypeScript 是 JavaScript 的超集，由微软开发的一种静态类型的面向对象的编程语言，最终编译为 JavaScript 运行，极大的提高了 JavaScript 开发大型应用的能力

## TypeScript vs JavaScript

1. TypeScript 更适合大型应用
2. TypeScript 是 JavaScript 的超集，类似于 less、scss
3. TypeScript 是跨平台的，且开源，因为 TypeScript 最终编译为 JavaScript
4. TypeScript 始于 JavaScript，终于 JavaScript
5. TypeScript 可以重用 JavaScript 的代码，甚至可以引入 JavaScript 的库
6. TypeScript 提供了完整的类、接口、模块等面向对象的特性

## TypeScript 类型

- `undefined`
- `number`
- `string`
- `boolean`
- `enum`
- `any`
- `void`
- `array`
- `tuple`
- `null`

### `undefined`

在 js 中定义了一个变量，但没有为其赋予任何值，此时该变量的值 undefined 类型

```typescript
let age: number
console.log(age) // undefined
```

### `number`

所有的数字都是 number 类型，这不分是整数还是小数
