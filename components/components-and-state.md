# 组件和状态设计

- 数据驱动视图
- 状态设计:  react-state vue-state
- 视图设计:  组件结构和拆分


## react-todoList 

:::details

> state 数据结构设计

```ts
import React, { useState } from "react";

interface TodoProps {
  id: number;
  title: string;
  completed: boolean;
}

const Demo: React.FC = () => {
  const [list, setTodoList] = useState<TodoProps[]>([]);

  return (
    <>
      <div></div>
    </>
  );
};
export default Demo;

```


> 组件设计

- todoList 组件 容器组件负责管理数据
  - input 组件  只负责输入，数据结构传递给父组件
  - list 组件   只负责展示的数据，从父组件拿到要展示的数据
    - listItem组件

```

```

:::