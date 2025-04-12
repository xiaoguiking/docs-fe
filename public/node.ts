let str: number = 123;
str = 23;

console.log(str);

let obj = { message: "" };
// obj.messag1

const a = 0;
const b = true;

// const res = a + b;

let strVal: string = "ts";

function numFn(num: number): number {
  return Number(num);
}
const obj1: object = { name: 123 };

// let arr:number[] = [1,2,4,"212"]
// let arr: (number | string)[] = [1, 23, 4, "this"];

// let arr1: Array<number | string> = [1, 23, 4, "this"];

const arr: readonly number[] = [0, 1];

// arr.push(3);

let a1: number = 1;

// if (a === 1 && a === 2) {
// }

let aaa = {
  name: "ck",
  age: 23,
};

aaa.age;

const as = [1, 3, "this", true];

// const arrList: Array<any> = [];

// arrList

interface Person {
  name: string;
  age: number;
}

const arrList: Person[] = [
  {
    name: "kc",
    age: 123,
  },
  {
    name: "k1c",
    age: 1223,
  },
];

interface PersonObj {
  name: string;
  age?: number;
  [index: string]: any;
}

let person: PersonObj = {
  name: "ck",
  age: 23,
  school: "23",
};

// 函数重载与可调用注解

const arr1List = [
  {
    name: "ck",
    age: 23,
    school: "23",
  },
  {
    name: "1ck",
    age: 213,
    school: "213",
  },
];

const zz = arr1List.map((item) => {
  const { name, age, school } = item;
  return {
    name,
    age,
    school,
  };
});

const zz1 = arr1List.map((item) => {
  return item;
});
