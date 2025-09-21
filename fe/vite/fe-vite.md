# Vite


## vite 入门

### vite 的优势

- Esbuild 优点
  - go语言开发，多线程打开，直接编译成机器码
  - 多核并行
  - 从零开始，无需分析依赖
  - 高效利用内存，esbuild从头到尾尽可能复用一份ast节点数据 提高内存的利用效率，提升编译性能
- 缺点
  - 没有ts类型校验
  - 不能操作AST语法
  - 不支持装饰器语法
  - 产物target无法降级到es5以下
  
### 如何让vite打包代码在低版本的浏览器下运行


> @vitejs/plugin-legacy
> 打包文件内容会分为两个文件，1.模块化内容，2.非模块化内容，会打包为新增vite-legacy-polyfill和vite-legacy-entry 文件的兼容文件

### vite的插件系统

## vite 接入工程化

### wg2vite移植zbestPC项目

- 安装依赖库 `npm install -g wp2vite`
  
- 使用方式
  ```javascript
  cd zbestPC  
  wp2vite
  配置package.json命令  "wp2vite": "wp2vite --config=./webpack.config.js"
  wp2vite -v  查看wp2vite版本
  ```

- 根据问题解决
  - 1. 打开页面发现页面空白，会报错找不到$, 这个是因为在webpack中加入了映射全局的配置
    - 解决: 安装插件`rollup-plugin-inject`
    -  ```javascript
       npm install rollup-plugin-inject 
       vite.config.js
       import inject from 'rollup-plugin-inject'
       plugins: [inject({ $: 'jquery', jQuery: 'jquery'})
       ```
  - 2. 模版文件的使用问题
    - 1.添加模版插件，进行配置
    - ```javascript
      npm install vite-plugin-html
      vite.config.js
      import { defineConfig } from 'vite'
      import vue from '@vitejs/plugin-vue'
      import html from 'vite-plugin-html'
      export default defineConfig({
        plugins: [
            createHtmlPlugin({
                entry: 'src/index.js',
                filename: 'index.html',
                template: './src/index.html'
            })
        ]
      })
      ```
    - 2.ejs模版中使用 暂无插件，需要手动复制源文件
    - 3.图片处理
      - ```
        <img src='img/gt3.png' />
        <img src='./src/img/gt3.png' />
        ```