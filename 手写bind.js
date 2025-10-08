function myApply(fn, context, args) {
    if (typeof fn !== 'function') {
        throw new TypeError('First argument must be a function');
    }
    context = context || globalThis;
    const uniqueId = Symbol('fn');
    context[uniqueId] = fn;
    const result = context[uniqueId](...args);
    delete context[uniqueId];
    return result;
}

function myCall(fn, context, ...boundArgs) {
    if (typeof fn !== 'function') {
        throw new TypeError('First argument must be a function');
    }
    context = context || globalThis;
    const uniqueId = Symbol('fn');
    context[uniqueId] = fn;
    const result = context[uniqueId](...boundArgs);
    delete context[uniqueId];
    return result;
}

window.a = 10;

// --- 使用示例 ---
function foo() { console.log(this.a); }
const obj = { a: 123 };
const boundFoo = myBind(foo, obj);
boundFoo(); // 123
foo(); // 10