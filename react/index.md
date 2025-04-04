# React


[[toc]]


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