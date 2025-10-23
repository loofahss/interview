// Object.assign() 浅拷贝
let o1 = {
    name:'张三',
    hobby:['吃饭','睡觉','打豆豆'],
}

let o2 = Object.assign({}, o1)

// 或者使用展开运算符(...)
//let o2 = {...o1}

o2.name = '李四' // 不会影响原对象

o2.hobby.push('学习') // 嵌套引用类型，共享内存地址，会改变原对象

console.log(o1) // { name: '张三', hobby: [ '吃饭', '睡觉', '打豆豆', '学习' ] }

console.log(o2) // { name: '李四', hobby: [ '吃饭', '睡觉', '打豆豆', '学习' ] }


// Array.prototype.slice() & Array.prototype.concat() 实现数组的浅拷贝

const originArr = ['a','b','c',['d','e']]

const arr1 = originArr.slice()

const arr2 = originArr.concat()

arr1.push('f') // 不会影响原数组

arr2.push('g') // 不会影响原数组

arr1[3].push('h') // 嵌套引用类型，会影响到 originArr、arr2 

console.log(arr1) // [ 'a', 'b', 'c', [ 'd', 'e', 'h' ], 'f' ]

console.log(arr2) // [ 'a', 'b', 'c', [ 'd', 'e', 'h' ], 'g' ]

console.log(originArr) // [ 'a', 'b', 'c', [ 'd', 'e', 'h' ] ]

// lodash 库的 _.clone() 方法实现浅拷贝
var _ = require('lodash');//commonjs 引入方式,适用于Node.js环境

let obj1 = {
    name:'张三',
    hobby:['吃饭','睡觉','打豆豆'],
}

let cloneResult = _.clone(obj1);

cloneResult.hobby.push('学习')

console.log(cloneResult) // { name: '张三', hobby: [ '吃饭', '睡觉', '打豆豆', '学习' ] }

console.log(obj1) // { name: '张三', hobby: [ '吃饭', '睡觉', '打豆豆', '学习' ] }


// 手动实现浅拷贝
function shallowClone(obj){
    // 可能是基本类型或null
    if (typeof obj !=='object' || !obj) return obj
    const result = Array.isArray(obj)?[]:{}
    for (const key of Object.keys(obj)){
        result[key]=obj[key]
    }
    return result
}

const oo1 = {
    name:'张三',
    age:18,
    sex:'男',
}

const arrr1 = [1,2,3,4,5]

console.log(shallowClone(oo1)) // { name: '张三', age: 18, sex: '男' }

console.log(shallowClone(arrr1)) // [ 1, 2, 3, 4, 5 ]