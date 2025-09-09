# TypeScript


[[TOC]]

## 基本用法

- 类型分类
  - 基本类型
    - string number boolean null undefined bigint symbol 
  - 对象类型
    - [] {} function
  - TS新增类型
    - any never unknown void enum

### 类型声明

类型声明   冒号 + 类型
```ts
let strVal:string = "ts";


function numFn(num: number): number {
  return Number(num);
}

```


### tsc 编译器

```shell
npm install -g typescript
```

```shell
指定编译操作
tsc app.ts
结果： 如果编译成功生成一个app.js文件
```

### ts-node 模块

```shell
npm install -g ts-node
```

运行指定文件
```shell
ts-node script.ts
```

## 特殊类型


  
:::details

- any 类型
  - any 类型表示没有任何限制，该类型的变量可以赋予任意类型的值。
- unknown 类型
  - unknown类型的变量，不能直接赋值给其他类型的变量（除了any类型和unknown类型）
  - unknown类型变量才可以使用。所谓“类型缩小”，就是缩小unknown变量的类型范围，确保不会出错
- never 类型
  - 由于不存在任何属于“空类型”的值，所以该类型被称为never，即不可能有这样的值。

```js
any 类型
let str: any = "this";

unknown 类型
let x: unknown;
x = 123;

let v1:boolean = x;  // 报错

let v2:unknown: {obj: 123};
v2.obj  //报错

let a:unknown = 1;
if (typeof a === 'number') {
  let r = a + 10; // 正确
}


never类型

let x:never;

function fn(x:string|number) {
  if (typeof x === 'string') {
    // ...
  } else if (typeof x === 'number') {
    // ...
  } else {
    x; // never 类型
  }
}

```
:::


## 类型系统

### 基本类型

:::details
- string
- number
- boolean
- undefined
- null
- bigint
- symbol
- object
:::


:::details
```js
string
const str: string = "ck";

number 类型包含所有整数和浮点数
const num:number = 123;

boolean
const true1: boolean = true;
const false1: boolean = false;

bigint  bigint 与 number 类型不兼容。
const x:bigint = 123n;
const y:bigint = 0xffffn;

symbol
const x:symbol = Symbol();

object
const obj: object = {name: 123}


undefined，null 
let x:undefined = undefined;
let y: null = null;
```
:::


## 包装对象类型

:::details
```js
- Boolean 和 boolean
- String 和 string
- Number 和 number
- BigInt 和 bigint
- Symbol 和 symbol


'hello' // 字面量
new String('hello') // 包装对象

大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。
const str:string = "hello"

const str1: String = new String('hello')
const str2: String = "hello"

```
:::


## Object 类型与 object 类型


> Object类型


:::details
**除了undefined和null这两个值不能转为对象，其他任何值都可以赋值给Object类型**
```js
let obj:Object;
 
obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
```
:::

> object 只包含对象、数组和函数

:::details
**除了undefined和null这两个值不能转为对象，其他任何值都可以赋值给Object类型**
```js
const o2:object = { foo: 0 };

interface PersonObj {
  name: string;
  age?: number;
  // 索引签名
  [index: string]: any;
}

let person: PersonObj = {
  name: "ck",
  age: 23,
  school: "23",
};


type Obj = { username: string}
// 处理为{}
let obj = {} as Obj;

```
:::


## 联合类型

:::details


> 联合类型（union types）指的是多个类型组成的一个新类型，使用符号|表示。

```js
let x:number|string;

x = 123; // 正确
x = 'abc' // 正确


let name:string|null;

name = 'John';
name = null;


// 类型缩小处理指定类型
function printId(
  id:number|string
) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```
:::



## 交叉类型
:::details

> 交叉类型A&B表示，任何一个类型必须同时属于A和B，才属于交叉类型A&B，即交叉类型同时满足A和B的特征交叉类型的主要用途是表示对象的合成

```js
let obj:
  { foo: string } &
  { bar: string };

obj = {
  foo: 'hello',
  bar: 'world'
};
```
:::


## type 命令



:::details

> type命令用来定义一个类型的别名

```js
type Age = number;
let age: Age = 23;
```
:::


## TypeScript 的数组类型

:::details

> 第一种写法是在数组成员的类型后面，加上一对方括号。

```js

// 数组成员只能是number
let arr:number[] = [1,2,34]

// 数组成员只能是number | string

let arr: (number|string)[] = [1,23,4, "this"]
```
:::


:::details

> 第二种写法是使用 TypeScript 内置的 Array 接口

```js
let arr1: Array<number | string> = [1, 23, 4, "this"];
```
:::

### 只读数组，const 断言


:::details

> arr是一个只读数组，删除、修改、新增数组成员都会报错。

```js
const arr:readonly number[] = [0, 1];

arr[1] = 2; // 报错
arr.push(3); // 报错
delete arr[0]; // 报错

```

> readonly关键字不能与数组的泛型写法一起使用。

```js
const arr:readonly Array<number> = [0, 1];
```

> 两个专门的泛型，用来生成只读数组的类型。

```js
const a1:ReadonlyArray<number> = [0, 1];

const a2:Readonly<number[]> = [0, 1];
```
:::


### 多维数组

:::details
> TypeScript 使用T[][]的形式，表示二维数组，T是最底层数组成员的类型。

```js
var multi:number[][] =
  [[1,2,3], [23,24,25]];
```
:::



## TypeScript 的元组类型 tuple


:::details
> 由于数组里面的成员类型不同，元祖必须明确每个成员的类型

```js
const arr: [number, string, boolean] = [1,'23',true]

元组成员的类型可以添加问号后缀（?），表示该成员是可选的。
问号只能用于元组的尾部成员
let a:[number, number?] = [1];


使用扩展运算符（...），可以表示不限成员数量的元组。

type NamedNums {
  string,
  ...number[]
}

const a:NamedNums = ['A', 1, 2];
const b:NamedNums = ['B', 1, 2, 3];
```
:::


###  只读元组

:::details
```js
// 写法一
type t = readonly [number, string]

// 写法二
type t = Readonly<[number, string]>

```
:::


## Function 函数

:::details
```js

function txt(txt: string): void {
  console.log(txt)
}
```
:::


### Function 

:::details
```js
参数f的类型就是Function，代表这是一个函数。

function doSomething(f:Function) {
  return f(1, 2, 3);
}
```
:::


### 箭头函数

:::details
```js
const repeat = (
  str:string,
  times:number
):string => str.repeat(times);

type Person = {
  name: string
}

const people = ["ali", "jak", "sd"].map((name): Person => ({name}))
```
:::


### 参数解构

:::details
```js
type ABC = {a:number; b:number; c:number}
function sum({a,b,c}: ABC) {
  console.log(a+b+c)
}
```
:::



### rest参数

:::details 
```js
数组
function joinNumbers (...number: number[]) {
  console.log(number)
}

元祖
function joinNumbers (...args: [number,string, boolean]) {
  console.log(args)
}

元祖的参数值可选
function f(...args: [boolean, string?]) {}

function f(...args: [string, ...number[]]) {}
```
:::


### readonly 只读参数

:::details 
```js
如果函数内部不能修改某个参数，可以在函数定义时，在参数类型前面加上readonly关键字，表示这是只读参数。

readonly关键字目前只允许用在数组和元组类型的参数前面，如果用在其他类型的参数前面，就会报错。



function arr (arr: readonly number[]) {
  arr.push(2) // 报错
}
```
:::

### void

:::details 

>  void 类型表示函数没有返回值。 void 类型允许返回undefined或null。

```js
function f():void {console.log("hello")}
```

> 该变量、对象方法和函数参数可以接受返回任意值的函数，这时并不会报错。


```js
type voidFunc = () => void;

const f:voidFunc = () => {
  return 123;
};

```
:::



### never 类型 

:::details

> 抛出错误的函数。只要抛出错误才是never类型， 使用return 不是

```js
function f (msg: string): never {
  throw new Error(msg)
}

```
:::


### 高阶函数 higher-order function


:::details
```js
(someValue: number) => (multiplier: number) => someValue * multiplier;

```
:::


###  函数重载

:::details

>  有些函数可以接受不同类型或不同个数的参数，并且根据参数的不同，会有不同的函数行为。这种根据参数类型不同，执行不同逻辑的行为，称为函数重载（function overload）。

```js
reverse('abc') // 'cba'
reverse([1, 2, 3]) // [3, 2, 1]

需要分别定义每种类型

function reverse(str:string):string;
function reverse(arr:any[]):any[];
```
:::

### 构造函数


:::details

>  构造函数的最大特点，就是必须使用new命令调用。

```js
const d = new Date();
```

>  某些函数既是构造函数，又可以当作普通函数使用，比如Date()。这时，类型声明可以写成下面这样。

```js
type F = {
  new (s:string): object;
  (n?:number): number;
}
```
:::


## 对象


:::details

>  对象类型的最简单声明方法，就是使用大括号表示对象，在大括号内部声明每个属性和方法的类型。可以修改对象里面的值，不能删除对象里面的值(delete)

```js
属性类型以分号结尾
const obj: {
  x: number;
  y: number;
}

// 属性类型以逗号结尾

const obj: {
  x: number,
  y: number,
}

const o1: obj = {x: 1, y: 1} // 正确

const o1: obj = {x: 1}  // 报错
const o1: obj = {x: 1, y: 1, z: 1}  // 报错


// 写法一
type MyObj = {
  x:number;
  y:number;
};

const obj:MyObj = { x: 1, y: 1 };

// 写法二
interface MyObj {
  x: number;
  y: number;
}

const obj:MyObj = { x: 1, y: 1 };
```
:::


### 可选属性

:::details

>  如果某个属性是可选的（即可以忽略），需要在属性名后面加一个问号。

```js

interface MyObj {
  x: number;
  y?: number;
}

interface MyObj {
  x:number;
  y: number|undefined
}

const obj:MyObj = { x: 1 };

```

> 读取可选属性之前，必须检查一下是否为undefined

```js
const user:{
  firstName: string;
  lastName?: string;
} = { firstName: 'Foo'};

if (user.lastName !== undefined) {
  console.log(`hello ${user.firstName} ${user.lastName}`)
}
```
:::



### 只读属性


:::details

>  属性名前面加上readonly关键字，表示这个属性是只读属性，不能修改。

```js

interface Obj  {
  readonly prop: number
}

const person: {readonly age: number} = {age: 23}

person.age = 43 // 报错
```
:::


### 属性名的索引类型 

:::details

>  无法事前知道对象会有多少属性，使用 属性名的索引类型 

```js
property 对应的value 可以使用number、string symbol
interface Obj {

  [property: string]: number;
}

const person: Obj = {
  f1: "a",
  f2: "b"
}

```
:::


### 解构赋值

:::details

> 解构赋值用于直接从对象中提取属性。

```js
const {name, age} : {name: string, age: number}  = obj;

```
:::

### 空对象

:::details

> { [key: string]: unknown }（可扩展的空对象）

```js
const dynamicObj: { [key: string]: unknown } = {};
dynamicObj.abc = 123; // ✅ 可以动态添加属性
dynamicObj.xyz = "hello"; // ✅ 也可以添加不同类型的值
```

>unknown（最宽松的类型，可以表示空对象）

```js
const unknownObj: unknown = {};
(unknownObj as { abc: number }).abc = 123; // ✅ 需要类型断言才能使用
```
:::



## interface接口

### 简介

:::details

interface 是对象的模板，可以看作是一种类型约定

```ts
interface Person {
  name: string;
  age: number;
  School?: string;  // ?代表属性可选，可以不写
  readonly a: string;  // 只读属性
  [index:string]: string;  // 索引属性  包含string number symbol
  sayHello(): void;  // 方法
  sayHe: () => void;  // 方法

}
使用:
const person: Person = {
  name: "zhangsan"
  age: 34
}


函数的独立声明

interface Add {
  (x:number, y: number): number;
}

const add: Add = (x,y) => x+y



构造函数
interface ErrorConstructor {
  new (message: string): Error;
}

```
:::

### interface extends继承

:::details

> extends 多interface 继承
```ts
interface Father {
  name: string;
  age: number;
}
interface Other {
  other?:string;
}
interface Son extends Father, Other {
  sex: string;
}

const p: Son = {
  name: "kc",
  age: 23,
  sex: "male"
}
```

> extends 继承 type

```ts
type Father = {
  name: string;
}
interface Son extends Father {
  age: number;
}

const p: Son = {
  name: "ck",
  age: 23
}

```

>  接口合并

```ts
interface A {
  name: string;
}
interface A {
  age: number;
}
const p: A = {
  name: "ck",
  age: 23
}
```
:::


### interface implements实现

:::details

>  implements 实现接口

```ts
interface Person {
  name: string;
  age: number;
  sayHello(): void;
}

class Student implements Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
  
}

```
:::


### interface vs type


:::details

---

## 🔍 区别一览表

| 特性                           | `interface`                | `type`                                                            |
| ------------------------------ | -------------------------- | ----------------------------------------------------------------- |
| ✅ 描述对象或类结构             | ✔️                          | ✔️                                                                 |
| ✅ 可扩展 / 继承（extends）     | ✔️ 支持接口继承             | ✔️ 支持交叉类型 `type A = B & C`                                   |
| 🔁 多次声明自动合并（合并声明） | ✔️ 支持（常用于库类型扩展） | ❌ 不支持                                                          |
| 🎯 可用于基本类型、联合类型等   | ❌ 不行，只能描述对象结构   | ✔️ 可以描述任何类型（联合、元组、函数等）                          |
| 🧠 更适合用作 class 类型定义    | ✔️                          | ✔️ 也可以（不常见）                                                |
| 🧩 使用泛型                     | ✔️ 支持                     | ✔️ 支持                                                            |
| 🧩 属性映射                     | 不支持                     | ✔️ 支持    `type PointCopy1 = {[Key in keyof Point]: Point[Key];}` |
---


:::

## class 类

:::details
跳过
:::


## 泛型