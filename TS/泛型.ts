// 泛型示例文件：泛型函数、约束、接口、类
// 泛型的核心作用是在创建函数、接口或类时，不预先指定具体类型，而是在使用时再指定类型，从而提高代码的复用性和灵活性。
// 同时也可以建立传入参数类型和返回值类型之间的关系。

function processValue<T>(input: T, defaultValue: T): T {
//                      ↑        ↑         ↑         ↑
//                     类型参数  参数类型   参数类型   返回值类型
    return input !== undefined ? input : defaultValue;
}

// 1) 简单的泛型函数 —— identity
function identity<T>(arg: T): T {
    return arg;
}
const num = identity<number>(42);
const str = identity('hello'); // 泛型推断
console.log(num, str); // 42 "hello"

// 2) 泛型接口
interface Box<T> {
    value: T;
}
const box: Box<string> = { value: '泛型盒子' };
console.log(box.value);

// 3) 泛型合并函数：返回交叉类型
function merge<T, U>(a: T, b: U): T & U {
    return Object.assign({}, a, b);
}
const obj = merge({ name: 'Alice' }, { age: 30 });
// obj 的类型为 { name: string } & { age: number }
console.log(obj.name, obj.age);

// 4) 泛型约束：要求有 length 属性
function longest<T extends { length: number }>(a: T, b: T): T {
    return a.length >= b.length ? a : b;
}
console.log(longest('short', 'longer string')); // "longer string"
console.log(longest([1, 2], [3])); // [1,2]

// 5) 泛型类：简单栈
class Stack<T> {
    private items: T[] = [];
    push(item: T) { this.items.push(item); }
    pop(): T | undefined { return this.items.pop(); }
    peek(): T | undefined { return this.items[this.items.length - 1]; }
}
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop(), stack.peek()); // 2 1