// var name = 'GLOBAL';
// var obj = {
//     name: '南木元元',
//     getName1: function(){
//         console.log(this.name);
//         var arrow=()=>{
//             console.log(this.name)
//         }
//         arrow()
//     },
//     getName2: () => {
//         const arrow=()=>{
//             console.log(this.name)
//         }
//         console.log(this.name);
//         arrow()
//     }
// };
// obj.getName1();    // '南木元元'
// obj.getName2();    // 'GLOBAL'
// obj.getName1.arrow()
let fn = (name, age) => console.log(arguments);
// 报错
// fn('南木元元', 18);
// 报错
// let p = new fn('南木元元', 18);
function parse(url){
    let obj={}
    url
    .slice(url.indexOf('?')+1)
    .split('&')
    .map(item=>{
        let [key,val]=item.split('=')
        obj[key]=val
    })
    return obj
}
// console.log(parse("https://?a=1&b=2&c=3"))

function parse_reduce(url){
    let obj={}
    url
    .slice(url.indexOf('?')+1)
    .split('&')
    .reduce((prev,curr)=>{
        let [key,val]=curr.split('=')
        if(!val) return prev
        pre[key]=val
        return prev//所以返回的事累加后的结果？
    },{})
    return obj
}

const obj={a:[1,2,[3,4],7],b:3}
// let [a,b,[c,d]]=obj
const {a}=obj
console.log(a)
console.log(Function.prototype.isPrototypeOf(Array))
