# Nodejs


## 模块化规范讲解

- ESModule设计理念是在编辑时就确定模块依赖关系以及输入输出
- CommonJS和AMD必须在运行时才能确定依赖和输入输出
- ESM通过import加载模块，通过export输出模块
 

## CommonJS和ESModule的规范对比

1.cjs模块输出的是值的拷贝，ES6模块输出的是值的引用
2.cjs模块是运行时加载，ES6模块是编译时输出接口
3.cjs模块的require是同步加载，ES6模块的import是异步加载
4.cjs模块的this是当前模块，ES6模块的this是undefined
5.cjs模块的顶层this是module.exports，ES6模块的顶层this是undefined
6.cjs是单个值导出，ES6模块可以导出多个