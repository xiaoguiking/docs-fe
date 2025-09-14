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

## webpack 核心概念

- entry: 入口模块文件路径
- output: 打包输出文件路径
- module: 模块 webpack构建对象
- bundle: 输出产物，webpack构建产物
- chunk: 中间文件，webpack构建的中间产物
- loader: 文件转换器
- plugin: webpack插件，执行特定的处理任务


## webpack demo 初始化 

### 如何初始化webapck整个项目

- 1. npm init 初始化项目
- 2. 创建`src/index.js`
- 3. 创建`public/index.html`
- 4. 创建`webpack.config.js`并填入配置
- 5. 执行`npm install -D webpack webpack-cli`
- 6. 配置build命令为webpack
- 7. 执行`npm run build`完成打包构建

```javascript 
webpack.config.js
const path = require("path");
const webpack = require("webpack");

module.exports = {
    // 打包环境
    mode: "development",
    // 生成source-map文件
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            // css loader转换
            // css-loader 模块化
            // style-loader 将css插入到head标签中
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "欢迎学习前端工程化"
        }),
    ]
} 
```
### loader执行顺序

- 从右向左，从下向上执行


### 自定义loader

1. 根目录创建`loader`文件夹，创建`custom-loader.js`
```javascript
const REG = /<script>([\s\S]+?)<\/script>/;

module.exports = function (source) {
    // console.log("🚀 ~ source:", source)
    const __source = source.match(REG)
    console.log("🚀 ~ __source:", __source)

    return __source && __source[1] ? __source[1] : source;
}

// 使用mode 主模块对正则进行测试
if (require.main === module) {
    const source = `<script>
    export default {
        a: 1,
        b： 2
    }
    </script>`
    const test = source.match(REG)
    console.log("🚀 ~ __source:", test[1])
}
```
2. 在`webpack.config.js`中添加loader配置
```javascript
    module: {
        rules: [
          ...省略css-loader内容
            // 自定义loader
            {
                test: /\.special$/,
                use: [path.resolve(__dirname, './loader/custom-loader.js')]
            }
        ]
    },
```
3. 在`src/index.js`中添加自定义loader文件 
```javascript
src/index.js
import value from './test.special'

src/test.special

<script>
    export default {
        a: 1,
        b: 2
    }
</script>
```


### 自定义plugin

1. 根目录创建`plugin`文件夹，创建`FooterPlugin.js`
   
```javascript
const { ConcatSource } = require('webpack-sources')
class FooterPlugin {
    constructor(options) {
        this.options = options
        console.log("🚀 ~ FooterPlugin ~ constructor ~ options:", options)
    }
    apply(compiler) {
        compiler.hooks.compilation.tap("FooterPlugin", (compilation) => {
            // console.log("🚀 ~ FooterPlugin ~ apply ~ compilation:", compilation)
            compilation.hooks.processAssets.tap('FooterPlugin', () => {
                // console.log("🚀 ~ FooterPlugin ~ apply ~ chunks:", chunks)
                for (const chunk of compilation.chunks) {
                    console.log("🚀 ~ FooterPlugin ~ apply ~ chunk:", chunk.files)
                    for (const file of chunk.files) {
                        // console.log("🚀 ~ FooterPlugin ~ apply ~ file:", file)
                        const comment = `/*${this.options.banner}*/`;
                        // 更新文件
                        compilation.updateAsset(file, old => {
                            return new ConcatSource(old, '\n', comment)
                        })
                    }
                }
            })
        })
    }
}

module.exports = FooterPlugin
```
2. 使用`webpack.config.js`中添加plugin配置
```javascript
    plugins: [
        new webpack.BannerPlugin({
            banner: "欢迎学习前端工程化"
        }),
        new FooterPlugin({
            banner: "底部footer"
        }),
    ]
```

## 前端原生项目工程化升级

### PC项目改造


- 第一阶段：项目webpack改造，使原生js项目能够支持模块开发以及打包
- 第二阶段: vue spa 单页应用改造，使项目能够使用vue进行单页应用开发
- 第三阶段：vue map 多页应用，使项目能够支持多页应用开发 

### 项目内容阶段 案例版

:::details
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
:::

#### 一、 项目初始化
:::details
1. 创建npm项目 `mkdir zbestpc_update npm init -y` 
2. npm i -D webpack webpack-cli 
3. 在src目录下创建index.js文件
4. 在根目录创建webpack.config.js文件
   ```javascript
   const path = require("path");
   const HtmlWebpackPlugin = require("html-webpack-plugin");
   const webpack = require("webpack");


   module.exports = {
       mode: "development",
       entry: "./src/index.js",
       output: {
           filename: "bundle.js",
           path: path.resolve(__dirname, "dist")
       },
       devServer: {

       },
       module: {
           rules: [
               // 处理css
               {
                   test: /\.css$/,
                   use: ["style-loader", "css-loader"]
               },
               // 处理图片
               {
                   test: /\.(png|svg|gif|jpg|jpeg)$/i,
                   type: "asset",
                   parser: {
                       dataUrlCondition: {
                           maxSize: 8 * 1024
                       }
                   },
                   generator: {
                       filename: "img/[name]_[hash:8][ext]"
                   }
               }
           ]
       },
       plugins: [
           new HtmlWebpackPlugin({
               filename: "index.html",
               template: "./src/index.html"
           }),
           new HtmlWebpackPlugin({
               filename: "login.html",
               template: "./src/login.html"
           }),
           new webpack.ProvidePlugin({
               $: "jquery",
               jQuery: "jquery"
           })
       ]
   } 
   ```
5. 在package.json中添加build命令 `"build": "webpack --config webpack.config.js"`
6. 执行build命令 `npm run build`
:::

#### 二、首页移植
#### 三、登录页移植
#### 四、进阶操作性能优化

> 1. 多js分离

:::details
```JavaScript
1. src/login.js引入其他css文件
2. 修改webpack.config.js文件
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
        login: "./src/login.js"   // 新增
    },
    output: {
        filename: "js/[name].js",   // 新增
        path: path.resolve(__dirname, "dist")
    },
    devServer: {

    },
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // 处理图片
            {
                test: /\.(png|svg|gif|jpg|jpeg)$/i,
                type: "asset",
                // 小于8kb的图片转为base64
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                generator: {
                    filename: "img/[name]_[hash:8][ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["index"] // 新增
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: "./src/login.html",
            chunks: ["login"]  // 新增
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
} 
```
:::

> 2. 启动开发服务器、图片拷贝
:::details
```JavaScript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
        login: "./src/login.js"
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist")
    },
    // 新增
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        // 启动压缩
        compress: true,
        port: 9999,
        // 热启动
        hot: true
    },
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // 处理图片
            {
                test: /\.(png|svg|gif|jpg|jpeg)$/i,
                type: "asset",
                // 小于8kb的图片转为base64
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                generator: {
                    filename: "img/[name]_[hash:8][ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: "./src/login.html",
            chunks: ["login"]
        }),
        // 全局映射库
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // 新增 拷贝插件
        new CopyWebpackPlugin({
            patterns: [{
                from: path.join(__dirname, "./src/img"),
                to: path.join(__dirname, "./dist/img")
            }]
        })
    ]
} 
```
:::

> 3. css 优化抽离

:::details
```JavaScript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                // use: ["style-loader", "css-loader"]
                // 剥离插入dom中的css
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
        ]
    },
    plugins: [
        // 剥离css生成单独文件
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[name].chunk.css"
        })
    ]
```
:::


> 4. 压缩css、js

:::details
```javascript
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 压缩css
// 配置优化
optimization: {
  // 开发环境压缩
  minimize: true,
  minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
},
```
:::

> 5. Tree Shaking

:::details
```javascript
- 在不同文件中
  - 1. 通过解构的方式获取方法，可以触发treeshaking
  - 2. 通过import引入，可以触发treeshaking 
  - 3. 调用的包必须使用esm规范  export function test() { }; import { get } from 'lodash-es'

- 在同一个文件中
  - 条件就是mode=production
- 一定要使用解构加载模块 才会触发treeshaking
   console.log(get({ a: 1, b: 2 }, "a")); // 1
   test1()
```
:::


> 5. 代码分隔

:::details
```javascript
    // 配置优化
    optimization: {
        // 开发环境压缩
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        // 分割代码
        splitChunks: {
            minSize: 30 * 1024, // 最小大小 30kb
            chunks: "all",
            name: "common",
            cacheGroups: {
                jquery: {
                    name: "jquery",
                    test: /jquery/,
                    chunks: "all"
                }
            }
        }
    },
```
:::

> 6. 清理旧dist

:::details
```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");  // 自定义执行清理

plugins: [
    new CleanWebpackPlugin()
]

// 直接默认配置清理
output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    // 清理旧dist
    clean: true,
},
```
:::

#### 五、Vue spa 改造
#### 六、Vue mpa 改造