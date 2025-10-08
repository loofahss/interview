let strs=["ab",'db','nc','aa']
strs.sort()
// console.log(arr)
let arrs=[]
for(const str of strs){
    let arr=Array.from(str)
    arr.sort()
    arr.splice(0,1)
    console.log(arr)
}

console.log(strs[0].length)

