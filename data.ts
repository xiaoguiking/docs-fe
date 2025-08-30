const data: string[] = [];

// data.push(1)

const data1: Array<string> = [];

// 元组
const data2: [string, number?, string?] = ["2", 1, "3"];

data2[2];

const arr: [name: string, age: number] = ["ck", 23];

const str = "23";

enum StatusType {
  "delete" = 2,
  "success" = 4,
}

interface IRes {
  code: number;
  status: StatusType;
  data: any;
}

const foo = (name: string): number => {
  return name.length;
};

const foo1 = (name: string) => (name) => {
  name.length;
};

function foo2(): void {}

const arr4 = [] as string[];

arr4.push("linbudu");

interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: "linbudu",
  age: 18,
};

type StrAndNum = string & number;

interface AllStringTypes {
  [key: string]: string | number | boolean;
  // [key: string]: string | number;
}

const foo12: AllStringTypes = {
  linbudu: "599",
  num: 123,
  zz: false,
  zo: "",
};

// 交叉类型
type A = { a: string };
type B = { b: number };
type C = A & B;
const ab: C = {
  a: "linbudu",
  b: 123,
};
// 联合类型
