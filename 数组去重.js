let arr=[
    233,
    233,
    {
        name:1,
        index:2,
    },
    {
        name:1,
        index:2,
    },
    "hellp",
    "hellp",
    [2],
    [2],
    [2,3]
]

// console.log(arr.myUnique())
Array.prototype.myUnique=function(){
    // return Array.from(new Set (this))
    // let arr=[]
    // for(let i=0;i<this.length;i++){
    //     if(!arr.includes(this[i])){
    //         arr.push(this[i])
    //     }
    // }
    // return arr
    // return this.filter((val,idx)=>{
    //     return this.indexOf(val,0)===idx
    // })
    const arr=new Set()
    return this.filter(item=>{
        const key=typeof item ==='object'?JSON.stringify(item):item
        if(arr.has(key)) return false
        arr.add(key) 
        return true
    })
}
console.log(arr.join(''))
// console.log(Array.prototype.myUnique.toString())