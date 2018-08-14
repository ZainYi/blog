---
sidebar: auto
---

# flexbox 实现图片横向瀑布流

实现的效果和百度图片搜索结果的展示方式大致相同

**HTML**

```html
<ul id="waterfall">
  <li><img src="https://gaoqiang19514.github.io/waterfall/images/24.jpg" /></li>
  <li><img src="https://gaoqiang19514.github.io/waterfall/images/25.jpg" /></li>
  <li><img src="https://gaoqiang19514.github.io/waterfall/images/3.jpg" /></li>
  <li><img src="https://gaoqiang19514.github.io/waterfall/images/17.jpeg" /></li>
  <li><img src="https://gaoqiang19514.github.io/waterfall/images/18.jpeg" /></li>
  <li><img src="https://gaoqiang19514.github.io/waterfall/images/19.jpg" /></li>
  <li><img src="https://gaoqiang19514.github.io/waterfall/images/17.jpeg" /></li>
  <li><img src="https://gaoqiang19514.github.io/waterfall/images/18.jpeg" /></li>
                                    ...
                                    ...
                                    ...
  <li><img src="https://gaoqiang19514.github.io/waterfall/images/17.jpeg" /></li>
  <li><img src="https://gaoqiang19514.github.io/waterfall/images/18.jpeg" /></li>
</ul>
```

**CSS**

```css
* {
  margin: 0px;
  padding: 0px;
}

#waterfall {
  display: flex;
  flex-wrap: wrap; /* 折行 */
}

#waterfall:after {
  flex-grow: 9999999; /* 最后一行占位 */
  content: '';
}

#waterfall li {
  flex-grow: 1; /* 根据剩余的空余空间，做拉伸 */
  overflow: hidden;
  margin: 2px;
  list-style: none;
}

#waterfall li img {
  height: 200px; /* 很重要，固定图片高度 */
  min-width: 100%; /* 配合 object-fit 属性 */
  object-fit: cover; /* 让图片尽量占满父级元素，有一定的兼容性问题 */
  vertical-align: middle;
}
```

**示例**
![横向瀑布流示例](./image/004001.png)
