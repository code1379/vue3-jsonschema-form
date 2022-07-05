# h 函数

```ts
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
  // 判断传入参数的长度
  const l = arguments.length
  // 长度等于 2，只有 type 和 propsOrChildren
  if (l === 2) {
    // * 如果 propsOrChildren 是对象。则是单个节点
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      // props without children
      return createVNode(type, propsOrChildren)
    } else {
      // * propsOrChildren 是对象，也是数组。 => 有子节点相当于
      // omit props
      return createVNode(type, null, propsOrChildren)
    }
  } else {
    // ? 如果长度大于 3
    if (l > 3) {
      // eslint-disable-next-line prefer-rest-params
      // [1,2,3,4].slice(2) => [3,4] 相当于把后面的参数放到 数组里
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVNode(children)) {
      children = [children]
    }
    return createVNode(type, propsOrChildren, children)
  }
}
```

h 函数 就是对 vnode 的封装
