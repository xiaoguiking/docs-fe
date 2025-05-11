# Javascript


## 数组方法 reduce方法使用案例

:::danger

reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
:::


**1.求对象数组中值的总和**

```javascript
const arr = [1,2,3,4,5]
const result = arr.reduce((prev, curr) => prev + curr , 0)
console.log(result) // 15

```

**2.展开嵌套的数组**
```javascript
const arr = [[1,2,3], [23,423],23, [2723], [34, [34, 234]]];
// 处理二维数组
const result = arr.reduce((prev,curr) => prev.concat(curr), [])
console.log(result)   [1, 2, 3, 23, 423, 23, 2723, 34, Array(2)]
// 处理多维数组
const resArr = arr.reduce((prev, curr) => return prev.concat(Array.isArray(curr) ? curr.flat(Infinity) : curr);), [])

```