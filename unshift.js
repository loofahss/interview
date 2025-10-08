let arr=[1,2,3,4,5,6]
let res=arr.unshift(0)
let pop=arr.pop()
console.log(pop)
let shift=arr.shift()
console.log(shift)
console.log(arr)
console.log(res)
Array.prototype.MyUnShift=function(){
    const len=arguments.length
    for(let i=len-1;i>=0;i--){
        this.splice(0,0,arguments[i])
    }
    return this.length
}
let res2=arr.MyUnShift(-1,-2)
console.log(arr+'\n'+res2)