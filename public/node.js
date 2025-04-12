var str = 123;
str = 23;
console.log(str);
var obj = { message: "" };
// obj.messag1
var a = 0;
var b = true;
// const res = a + b;
var strVal = "ts";
function numFn(num) {
    return Number(num);
}
var obj1 = { name: 123 };
// let arr:number[] = [1,2,4,"212"]
// let arr: (number | string)[] = [1, 23, 4, "this"];
// let arr1: Array<number | string> = [1, 23, 4, "this"];
var arr = [0, 1];
// arr.push(3);
var a1 = 1;
// if (a === 1 && a === 2) {
// }
var aaa = {
    name: "ck",
    age: 23
};
aaa.age;
var as = [1, 3, "this", true];
var arrList = [
    {
        name: "kc",
        age: 123
    },
    {
        name: "k1c",
        age: 1223
    },
];
var person = {
    name: "ck",
    age: 23,
    school: "23"
};
// 函数重载与可调用注解
var arr1List = [
    {
        name: "ck",
        age: 23,
        school: "23"
    },
    {
        name: "1ck",
        age: 213,
        school: "213"
    },
];
var zz = arr1List.map(function (item) {
    var name = item.name, age = item.age, school = item.school;
    return {
        name: name,
        age: age,
        school: school
    };
});
console.log(zz);
