---
sidebar: auto
---

# 解决移动端 click 事件 300ms 延时

## fastclick

用法示例

```javascript
// 在 Vue 项目中 main.js 中
import fastClick from 'fastclick'
fastClick.attach(document.body)

// 更详细的用法请查看 github 上 fastclick 文档说明
```

缺点

- 引入了一个包
- [fastclick](https://github.com/ftlabs/fastclick.git)很久没更新了
- 双击在 chrome 较新的版本中会报错或者警告，因为 chrome 对点击等事件引入了 passive 属性来增强浏览器行为的流畅性

## touch-action

解决移动端 300ms 延迟，还可以使用 css 属性 `touch-action: manipulation;` 因为 `manipulation` 会禁用双击事件（浏览器就不需要等待 300ms 之后来判断了）

[详细文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action)

- 全局禁用双击事件

```css
html,
body {
  touch-action: manipulation;
}
```

- 在地图或游戏开发中，最常见的用法是禁用元素（及其不可滚动的后代）上的所有手势，以使用自己提供的拖放和缩放行为

```css
#map {
  touch-action: none;
}
```

- 水平图像轮播开发中，只想通过水平滑动但不想干扰网页的垂直滚动或缩放，可用以下代码

```css
.image-carousel {
  width: 100%;
  height: 150px;
  touch-action: pan-y pinch-zoom;
}
```

::: warning 注意
桌面端的 Safari 完全不支持该 Css 属性
IOS Safari 仅支持 `auto` 和 `manipulation`

在移动端上使用问题不是很大

详细兼容性请查看[caniuse](https://caniuse.com/#search=touch-action)
:::

fastclick 和 `touchaction` 混合使用也没有什么大问题
