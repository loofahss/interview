// // function myNew(fn,...args){
// //     //创建一个空对象
// //     const obj={}
// //     //将新对象的proto指向旧对象的prototype
// //     obj._proto_=fn.prototype
// //     //将构造函数的this绑定到新对象上并执行构造函数
// //     const result=fn.apply(obj,args)
// //     //如果构造函数返回值类型是object就返回原构造函数的返回值，否则返回新创建的对象
// //     return result instanceof Object?result:obj
// // }

// const a={
//     "A":3,
//     "B":4
// }
// // const b=a.slice(0)
// // const b=a
// // b[0]=5
// // console.log(b)
// const b=[1,2,3]
// let c=b.slice()
// c=[2,3]
// console.log(b,c)

// // function myNew(fn,...args){
// //     const obj={}
// //     obj._proto_=fn.prototype
// //     const result=fn.apply(obj,args)
// //     return result instanceof Object?result:obj
// // }

// function myNew(fn,...args){
//     const obj = {};
//     obj.__proto__ = fn.prototype;
//     const result = fn.apply(obj, args);
//     return result instanceof Object ? result : obj;
// }

// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//     return this.name;
// }
// const people = (name, age) => {
//     return {
//         name,
//         age
//     };
// };
// const p2 = new people('wangwu', 40);
// const p = new Person('zhangsan', 20);
// const p1 = myNew(Person, 'lisi', 30);
// console.log(p);
// console.log(p1);
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async1()
new Promise((resolve) => {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')