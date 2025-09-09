---
outline: deep
---
# 前端工程化

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


##   前端原生项目工程化升级

## PC项目改造


- 第一阶段：项目webpack改造，使原生js项目能够支持模块开发以及打包
- 第二阶段: vue spa 单页应用改造，使项目能够使用vue进行单页应用开发
- 第三阶段：vue map 多页应用，使项目能够支持多页应用开发 

### 项目内容阶段

- PC项目改造
  -  项目webpack改造
     - 项目初始化
       - 1. 创建npm项目
       - 2. 安装webpack依赖
       - 3. 创建js入口文件
       - 4. 创建webpack配置文件
       - 5. 配置package.json build命令
       - 6. 执行build命令
     - 首页移植
       - 1. 资源拷贝
       - 2. 删除index.html中的link和css引入
       - 3. 安装html-webpack-plugin插件
       - 4. 配置webpack插件
       - 5. 在src/index.js中添加css引用
       - 6. 在src/index.js中添加js引用
       - 7. 调整index.html图片引用
     - 登录页移植
       - 1. 拷贝login至src/login.html
       - 2. 删除css引用
       - 3. 修改图片链接为img 为../src/img
       - 4. 在src/index.js中添加`import './css/login.css'`
       - 5. 修改webpack配置，添加login.html的配置
     - 进阶操作
       - 多js分离
       - 开发模式
       - css独立打包
       - js && css压缩
       - 公共模块抽象
       - 清空打包结果
  -  Vue spa 改造
     -  创建build目录
        -  1. 将webpack配置移动到build目录
        -  2. 将相对路径改为绝对路径
        -  3. 修改scripts命令
     -  接入vue
        -  1. 安装依赖
        -  2. 添加vue源码
        -  3. 创建模版文件
        -  4. 在webpack中配置添加vue打包配置
     -  首页移植
     -  VueRouter接入
        -  1. 安装vue-router依赖
        -  2. 添加router.js配置
        -  3. 修改main.js 添加vue-router相关代码
     -  登录页移植
        -  1. 创建login.vue移植html和js代码
        -  2. 修改App.vue
        -  3. 将public.css移到全局
        -  4. 修改home.vue 跳转到login.vue方法
  -  Vue mpa 改造
     -  1. 创建mpa目录，新建home.js和login.js
     -  2. 修改home.vue路由跳转源码
     -  3. 创建webpack.vue.map.config.js添加MPA配置



## webpack 核心概念

- entry: 入口模块文件路径
- output: 打包输出文件路径
- module: 模块 webpack构建对象
- bundle: 输出产物，webpack构建产物
- chunk: 中间文件，webpack构建的中间产物
- loader: 文件转换器
- plugin: webpack插件，执行特定的处理任务


## webpack demo 初始化 

- 1. npm init 初始化项目
- 2. 创建`src/index.js`
- 3. 创建`public/index.html`
- 4. 创建`webpack.config.js`并填入配置
- 5. 执行`npm install -D webpack webpack-cli`
- 6. 配置build命令为webpack
- 7. 执行`npm run build`完成打包构建



