let str = "Hello_World_Hello";
// 带有全局标志（g）的正则表达式，匹配 "Hello"
let regex = /Hello/g;

// 第一次匹配
let match1 = regex.exec(str); 
// 匹配结果: ["Hello"]
// regex.lastIndex: 5  （下一个搜索从索引 5 处开始，即 '_' 的位置）

// 第二次匹配
let match2 = regex.exec(str);
// 匹配结果: ["Hello"]
// regex.lastIndex: 17 （下一个搜索从索引 17 处开始，即字符串末尾）

// 第三次匹配
let match3 = regex.exec(str);
// 匹配结果: null （没有更多匹配）
// regex.lastIndex: 0  （匹配失败后，lastIndex 被重置为 0）