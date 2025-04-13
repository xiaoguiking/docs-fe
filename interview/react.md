# Interview-React


[[toc]]

## React Hooks 解决了什么问题(class组件的问题) ？


::: details
- class
  - 大型组件的难以拆分重构 难测试
  - 相同业务逻辑 分散到各个方法，逻辑混乱
  - 复用逻辑变得负责 Mixins HOC Render Prop
- react hooks
  - 函数式编程 view = fn(state)
  - 函数更加灵活 
  - 函数组件简单增强-- hooks
:::


## 为什么说需要state 和 setState ？


::: details
- 函数组件没有state
- 函数组件是一个纯函数，执行完就销毁，无法存储state
- 需要state hook 即把state 的功能勾到纯函数中
:::



## useEffect 使用

```jsx
import { FC, useState, useEffect } from "react";

const UseStateDemo: FC = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

    useEffect(() => {
      console.log("ajax----1--------");
    });

  useEffect(() => {
    console.log("ajax------2------");
  }, []);

  useEffect(() => {
    console.log("ajax------3------");
  }, [count]);

  useEffect(() => {
    console.log(`监听 count 变化: ${count}`);

    return () => {
      console.log(`清理上一次的 count: ${count}`);
    };
  }, [count]); // 依赖 count，count 变化时执行
  return (
    <div>
      <button onClick={handleClick}>click me</button>
      <p>count: {count}</p>
    </div>
  );
};

export default UseStateDemo;

```

::: details
| `useEffect` | 依赖项                               | 执行时机                                           |
| ----------- | ------------------------------------ | -------------------------------------------------- |
| 第 1 个     | 无                                   | **每次渲染后**（包括更新）都会执行                 |
| 第 2 个     | `[]`                                 | **仅组件挂载时执行一次**                           |
| 第 3 个     | `[count]`                            | **组件挂载时执行一次**，然后 `count` 变化时执行    |
| 第 4 个     | `return, []`  组件卸载时清理         | **useEffect(() => { return () => {...} }, [])**    |
| 第 4 个     | `return, [count]`   依赖项变化时清理 | **useEffect(() => { return () => {...} }, [dep])** |



| class 生命周期       | hooks 方式                                                          |
| -------------------- | ------------------------------------------------------------------- |
| componentDidMount    | **useEffect依赖[]**                                                 |
| componentDidUpdate   | **useEffect 无依赖，或者依赖[a,b]**                                 |
| componentWillUnMount | **useEffect(() => { return () => {...} }, [])** return 返回一个函数 |
:::



## React hooks 使用规范


::: details
- 只在函数最外层调用 Hook
- 不要在循环、条件或嵌套函数中调用 Hook  严重依赖于调用顺序
- 在 React 的函数组件中调用 Hook
- 在自定义 Hook 中调用其他 Hook
- 命名规范useXXX
:::


## React hooks 注意事项

::: details
- 1. useState 初始化值，只有第一次有效， 父子传值，子组件使用传入的props 做useState
- 2. useEffect 内部不能修改state
- 3. useEffect 可能会出现死循环 （不要依赖对象）
:::

```jsx

import { useState, FC } from "react";
import Son from "./Son";

const Father: FC = () => {
  const [userInfo, setUserInfo] = useState({ name: "ck" });
  const handleClick = () => {
    setUserInfo({ name: "ck2" });
  };
  return (
    <div>
      <h1>父组件</h1>
      <button onClick={handleClick}>change me</button>
      <Son userInfo={userInfo}></Son>
    </div>
  );
};
export default Father;


import { useState, FC } from "react";

interface UserInfo {
  name: string;
}
const Son: FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  const [name, setName] = useState<string>(userInfo.name);
  return (
    <div>
      <h2>子组件</h2>
      <p>父组件传递值 {userInfo.name}  // 会改变</p> 
      <p> 子组件 name: {name}   // 不会改变，只有自己setName才能改变</p>
    </div>
  );
};
export default Son;

```

## 使用useRef

```jsx
import React, { FC, useRef } from "react";
/**
 *  1.一般用于操作 dom
 *  2.可以传入普通 js 变量，但更新不会触发 rerender( state 可以触发 rerender)
 *  3. 不要在渲染期间写入或者读取 ref.current。 ( 使用 state )
 *  4. 可以在 事件处理程序或者 Effect 中读取和写入 ref。
 */
const UseRefDemo: FC = () => {
  // 1.
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.select();
  };

  //   2.
  const nameRef = useRef<string>("this");
  const handleClickChanged = () => {
    nameRef.current = "changed name";
    console.log(nameRef.current, "changed 但未触发视图更新");
  };
  return (
    <div>
      <input placeholder="hello world" ref={inputRef} />
      <button onClick={handleClick}>click me</button>
      <hr />
      <p>{nameRef.current}</p>
      <button onClick={handleClickChanged}>changed me</button>
    </div>
  );
};

export default UseRefDemo;



```


## useMemo (性能优化)  缓存数据

::: details
- 1. React 默认会更新所有子组件
- 2. class 使用SCU和PureComponent做优化
- 3. 基本类型props 可以使用memo优化， 但是引用类型需要(Hooks中使用useMemo + memo) (仅对 props 进行浅比较，而 对象（引用类型）在每次渲染时都会创建新引用)
:::


```jsx

import { useState, memo, useMemo, FC } from "react";

interface UserInfo {
  name: string;
  age: number;
}
const Child: FC<{ userInfo: UserInfo }> = memo(({ userInfo }) => {
  console.log("Child render......");
  return <div>{userInfo.name}</div>;
});

const FatherDemo: FC = () => {
  console.log("father render......");
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("jack");

  //   const userInfo = { name, age: 23 };
  const userInfo = useMemo(() => {
    return {
      name,
      age: 32,
    };
  }, [name]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}> add</button>
      <Child userInfo={userInfo} />
    </div>
  );
};

export default FatherDemo;

```


## useCallback (性能优化) 缓存函数

```jsx
import { useState, memo, useMemo, FC, useCallback } from "react";

interface UserInfo {
  name: string;
  age: number;
}
const Child: FC<{
  userInfo: UserInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = memo(({ userInfo, onChange }) => {
  console.log("Child render......");
  return (
    <div>
      <p>{userInfo.name}</p>
      <input onChange={onChange} />
    </div>
  );
});

const FatherDemo: FC = () => {
  console.log("father render......");
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("jack");

  //   const userInfo = { name, age: 23 };
  const userInfo = useMemo(() => {
    return {
      name,
      age: 32,
    };
  }, [name]);

  // function onChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   console.log("input change", e.target.value);
  // }
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input change", e.target.value);
  }, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}> add</button>
      <Child userInfo={userInfo} onChange={onChange} />
    </div>
  );
};

export default FatherDemo;

```



## 组件之间如何通信

- 父子组件通信
- 自定义事件
- Redux和Context
  
## 为什么渲染列表需要使用key

- 同Vue 必须用key 且不能是index和random
- diff算法中通过tag和key来判断，是否是sameNode
- 减少渲染次数，提升性能

## React常见的性能优化

> 配置懒加载

```jsx
const Home = lazy(() => import('./routes/Home'))
```

- 减少函数bind this 的次数
- 渲染列表时加key
- 自定义事件、DOM事件及时销毁
- 合理使用异步组件
- 合理使用SCU和Memo
- 合理使用Immutable.js


## React事件和DOM事件的区别

- 所有事件挂载到document上，最新是root上
- event不是原生的，是SyntheticEvent 合成事件对象
- dispatchEvent



## React 和 Vue 区别

- 都支持组件化
- 核心理念 数据驱动视图
- 使用Vdom操作DOM
- React拥抱JS  Vue使用模版拥抱html
- React函数式编程，Vue声明式编程