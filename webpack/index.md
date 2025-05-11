---
outline: deep
---

# Runtime API Examples

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).

## Webpack

:::danger
前端工程化解决了什么问题 ？
- 开发效率、开发规范、访问性能、代码质量、维护成本
- 举例代码问题点
  - js 全局作用域冲突
  - 编码规范问题
  - 资源合并和压缩问题
  - 高版本js预发降级问题 
:::

:::info
- 1. 项目架构升级  js ----  webpack + vue
- 2. 项目架构升级  工程架构升级 + 性能优化
- 3. 工程化脚手架升级    vue-cli  ----  zc-build
:::
### 前端原生项目工程化升级
 
