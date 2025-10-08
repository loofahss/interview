// 演示构造函数返回值的处理规则

console.log('=== 构造函数返回值规则演示 ===\n');

// 1. 返回原始类型（字符串）- 被忽略
function PersonString(name, age) {
    this.name = name;
    this.age = age;
    return 'I am a string'; // 原始类型，会被忽略
}

// 2. 返回对象类型 - 会被使用
function PersonObject(name, age) {
    this.name = name;
    this.age = age;
    return { customProp: 'I am custom object' }; // 对象类型，会被返回
}

// 3. 不返回任何值（默认返回undefined）
function PersonNormal(name, age) {
    this.name = name;
    this.age = age;
    // 没有return语句，默认返回undefined（原始类型）
}

// 测试原始类型返回值
const p1 = new PersonString('张三', 25);
console.log('返回字符串的构造函数:');
console.log('p1 =', p1);
console.log('typeof p1 =', typeof p1);
console.log('p1.name =', p1.name);
console.log();

// 测试对象类型返回值
const p2 = new PersonObject('李四', 30);
console.log('返回对象的构造函数:');
console.log('p2 =', p2);
console.log('typeof p2 =', typeof p2);
console.log('p2.name =', p2.name); // undefined，因为返回的是自定义对象
console.log('p2.customProp =', p2.customProp);
console.log();

// 测试正常构造函数
const p3 = new PersonNormal('王五', 35);
console.log('正常构造函数:');
console.log('p3 =', p3);
console.log('typeof p3 =', typeof p3);
console.log('p3.name =', p3.name);
console.log();

// 验证 instanceof
console.log('=== instanceof 检查 ===');
console.log('p1 instanceof PersonString:', p1 instanceof PersonString);
console.log('p2 instanceof PersonObject:', p2 instanceof PersonObject); // false!
console.log('p3 instanceof PersonNormal:', p3 instanceof PersonNormal);
console.log();

// 模拟 myNew 函数的行为
function myNewDemo(fn, ...args) {
    console.log('--- myNew 执行过程 ---');
    
    // 1. 创建新对象
    const obj = {};
    console.log('1. 创建空对象:', obj);
    
    // 2. 设置原型链
    obj.__proto__ = fn.prototype;
    console.log('2. 设置原型链完成');
    
    // 3. 执行构造函数
    const result = fn.apply(obj, args);
    console.log('3. 构造函数返回值:', result);
    console.log('   返回值类型:', typeof result);
    console.log('   是否为对象:', result instanceof Object);
    
    // 4. 判断返回值
    const finalResult = result instanceof Object ? result : obj;
    console.log('4. 最终返回值:', finalResult);
    console.log('--- myNew 执行完成 ---\n');
    
    return finalResult;
}

console.log('=== myNew 演示 ===');
const p4 = myNewDemo(PersonString, '赵六', 40);
console.log('最终结果 p4 =', p4);