let num
Math.round(num)//四舍五入取整
Math.floor(num)//向下取整
Math.ceil(num)//向上取整
console.log(Math.random(1))//[0,1)的随机数
function fn(min,max){
    // [min,max]
    // return Math.floor(Math.random(1)*(max-min+1))+min
    //(min,max] [0,max-min) [1,max-min+1] 
    return Math.ceil(Math.random(1)*(max-min))+min+1
}
globalThis.name='lblack'
globalThis.name='martin'
console.log(this.name)
