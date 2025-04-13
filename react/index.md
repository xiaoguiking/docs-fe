# React


[[toc]]


## React Class

### 事件

:::details

- 事件
  - bind this
  - event 参数
  - 传递自定义参数
  
- **16版本事件绑定在document**
- **17版本事件及以后绑定在root节点**


```js
class Demo extends React.Component {
  handleClick = (event, value) => {
    // event 不是原生event，是组合事件对象
    console.log(event, value);
  };
  // 修改this的指向 不会重复render
  this.handleClickMe = this.handleClickMe.bind(this);
  render() {
    return <>
     <button onClick={this.handleClickMe}>click me</button>
     <button onClick={(e) => this.handleClick(e, "hello")}>click</button>
    </>;
  }
}
```
:::


### React 组件通信

:::details
- 组件
  - props 传递数据
  - props 传递函数
  - props 类型检查

::::

### setState

:::details

- 不可变值
- 可能是异步更新
- 可能会被合并

```js


**不可变值--数组处理**

setState(prevState => {
  return {
    // 追加
    list: [...prevState.list, "new item"]
    // 追加
    list: prevState.list.concat("new item")
    // 截取
    list: prevState.list.slice(0,4)
    // 筛选
    list: prevState.list.filter(item => item > 100)
    // 其他操作 返回一个新的数组
    list: prevState.list.map(item => item + 1)
    // **注意** 不能直接对state进行push pop shift unshift splice 等直接修改数组的操作
  };
}

**不可变值--对象**
setState(prevState => {
  return {
    obj: {...prevState.obj, a: 100}
    obj1: Object.assign({}, prevState.obj1, {a: 100})
  }
})


**异步更新**

this.setState({
  count: this.state.count + 1
}, () => {console.log('callback',  this.state.count)}) // 回调函数 拿到最新的count值

console.log('count--------', this.state.count) // 异步更新，拿不到最新的值



**同步更新**
// setTimeout
setTimeout(() => {
  this.setState({
    count: this.state.count + 1
  })
  console.log("count------------", this.state.count) // 拿到最新值，同步更新
}, 1000)

// 自定义事件
document.getElementById("btn").addEventListener("click", () => {
  this.setState({
    count: this.state.count + 1
  })
  console.log("count------------", this.state.count) // 拿到最新值，同步更新
})

**合并更新**

默认count: 0
this.setState({
  count: this.state.count + 1
})

this.setState({
  count: this.state.count + 1
})
 
 **合并更新结果** 实际为count: 1

**不会合并更新**

this.setState((prevState, props) => {
  return {
    count: prevState.count + 1
  }
})

this.setState((prevState, props) => {
  return {
    count: prevState.count + 1
  }
})

**合并更新结果** 实际为count: 2

```
:::


### React-Class 组件生命周期

[React-Class 组件生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![React-Class 组件生命周期](../public/Snipaste_2025-04-13_14-16-43.jpg)

:::details


:::



## 自定义hooks

::: details
- hooks 使用规则  useXXX
- 调用顺序
- 使用React函数组件或者自定义hooks中
- 只能用在顶层代码，不能用于判断、循环中使用Hooks
- 
:::
```jsx
useAxios

import { useState, useEffect } from "react";
import axios from "axios";

export default function useAxios(url: string = "") {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((result: any) => {
        setData(result);
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return [loading, error, data];
}

```