/**
 * 判断一个对象是否存在循环引用
 * @param {any} obj - 要检查的对象
 * @returns {boolean} - 如果存在循环引用则返回 true，否则返回 false
 */

// 重点是递归

const isCyclic = (obj) => {
    const stackSet = new Set();
    let detected = false;
    const detect = (obj) => {
        if (obj && typeof obj !== 'object') {
            return;
        }
        if (stackSet.has(obj)) {
            detected = true;
            return;
        }
        stackSet.add(obj);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
            detect(obj[key]);
            }
        }
        stackSet.delete(obj);//很重要，如果遍历完这个对象发现他没有循环引用，就把他从这个Set中删除，这样就不会存在误判共享引用的情况了
    };
    detect(obj);
    return detected;
};
// --- 使用示例 ---

// 示例 1: 存在循环引用
const obj1 = {};
obj1.a = obj1; // 循环引用
console.log(isCyclic(obj1)); // 输出: true

// 示例 2: 不存在循环引用
const obj2 = {
    a: {
        b: 'hello'
    }
};
console.log(isCyclic(obj2)); // 输出: false

// 示例 3: 复杂对象，存在循环引用
const obj3 = {
    a: 1,
    b: {
        c: 2
    }
};
obj3.b.d = obj3; // obj3.b.d 指向 obj3
console.log(isCyclic(obj3)); // 输出: true

// 示例 4: 数组中的循环引用
const arr = [1, 2];
arr.push(arr);
console.log(isCyclic(arr)); // 输出: true

// const obj5 = {
//     a: 1,
//     b: {
//         c: 2
//     }
// };
// obj5.d = obj5.b; // obj5.e 指向 obj5.b
// console.log(isCyclic(obj5)); 
