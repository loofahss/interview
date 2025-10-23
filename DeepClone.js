// JSON.parse(JSON.stringify(obj)) 深拷贝
// 
// Function 函数、undefined，Symbol 等，会被忽略
// Date 对象，会被转换为字符串
// RegExp 对象、Error 对象等，会被转换为空对象
// NaN、Infinity、-Infinity，会被转换为 null

const obj1 = {
    name:'张三',
    age:18,
    sex: undefined,
    date:new Date(),
    getName(){
        console.log(this.name)
    },
    regexp: /abc/,  //regexp: {}
    error: new Error('错误信息'),
    nanValue: NaN,
    infinityValue: Infinity,
}

const obj_json=JSON.parse(JSON.stringify(obj1)) // { name: '张三', age: 18, date: '2025-08-20T13:55:14.625Z' }
console.log(obj_json)
console.log(JSON.stringify(obj1))


// lodash 库的 _.cloneDeep() 方法实现深拷贝
// 
// 不处理循环引用
// 函数只拷贝引用
// DOM / Promise / Proxy只拷贝引用

var _ = require('lodash');

const lodashCloneResult = _.cloneDeep(obj);

console.log(lodashCloneResult) 


// 手动实现深拷贝


// 用map存储原对象引用类型的地址=>新对象中该引用类型的地址
function deepClone(obj,map=new Map()){
    if (typeof obj!=='object'||!obj) return obj
    if (map.has(obj)) return map.get(obj)
    const currentTag=Object.prototype.toString.call(obj)
    switch (currentTag) {
        case '[object Date]':
            return new Date(obj.getTime());
        case '[object RegExp]':
            const regExpResult = new RegExp(obj.source,obj.flags);
            regExpResult.lastIndex=obj.lastIndex;
            return regExpResult;
        case '[object Set]':
            const setResult = new Set();
            map.set(obj,setResult);
            obj.forEach((v) => {setResult.add(deepClone(v,map))});
            return setResult;
        case '[object Map]':
            const mapResult = new Map();
            map.set(obj,mapResult);
            obj.forEach((v,k)=>{
                const clonedKey = deepClone(k,map);
                const clonedValue = deepClone(v,map);
                mapResult.set(clonedKey,clonedValue);
            })
            return mapResult;
    }
    let copy = Array.isArray(obj)?[]:{}
    map.set(obj,copy)
    for (let key in obj) {
        if(obj.hasOwnProperty(key)){
            copy[key] = deepClone(obj[key],map)
        }
    }
    return copy
}

const obj = {
    name: "张三",
    age: 18,
    hobby: ["唱", "跳", "rap", "篮球",obj.name],
    time: new Date(),
    arr: [1, 2, 3,obj],
    set: new Set([1, 2, 3]),
    map: new Map([
        ["a", 1],
        ["b", 2],
    ]),
};

const deepCloneObj = deepClone(obj);

console.log(obj)
console.log(deepCloneObj)