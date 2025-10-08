const { promise } = require("selenium-webdriver")
const { resource } = require("selenium-webdriver/http")
const { validate } = require("webpack")

class MyPromise{
    constructor(executor){
            this.status="pending",
            this.value=undefined,
            this.reason=undefined,
            this.onFulFilledCallbacks=[],
            this.onRejectedCallbacks=[]
            const resolve=(value)=>{
                if(this.status==="pending"){
                    this.status="fulfilled"
                    this.value=value
                    this.onFulFilledCallbacks.forEach(callback => {
                        callback(value)                    
                    });
                }
            }
            const reject=(reason)=>{
                if(this.status==="pending"){
                    this.status="rejected"
                    this.reason=reason
                    this.onRejectedCallbacks.forEach(callback=>{
                        callback(reason)
                    })
                }
            }
            try {
                executor(resolve,reject); 
            } catch (error) {
                reject(error);
            }
        }
        
    
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled === 'function'?onFulfilled:value=>value
        onRejected = typeof onRejected === 'function'?onRejected:reason=>{throw reason}
        return new MyPromise((resolve,reject)=>{
            if(this.status==="fulfilled"){
                setTimeout(()=>{
                    const result=onFulfilled(this.value)
                    resolve(result)
                })
            }else if(this.status==="rejected"){
                setTimeout(()=>{
                    const result=onRejected(this.reason)
                    reject(result)
                })
            }else{
                this.onFulFilledCallbacks.push(()=>{
                    setTimeout(()=>{
                        const result=onFulfilled(this.value)
                        resolve(result)
                    })
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        const result=onRejected(this.reason)
                        reject(result)
                    })
                })
            }
        })
    }
    catch(onRejected){
        return this.then(null,onRejected)
    }
    finally(onFinally){
        return this.then(onFinally,onFinally)
    }
    static resolve(value){
        if(value instanceof MyPromise){
            return value
        }
        return new MyPromise(resolve=>resolve(value))
    }




    static all(promiseArr){
        return new MyPromise((resolve,reject)=>{
            if(!Array.isArray(promiseArr)){
                return reject(new Error("传入的参数不是数组！"))
            }
            const res=[]
            let count=0
            for(let i=0;i<promiseArr.length;i++){
                // const isPromise=Object.prototype.toString.call(promiseArr[i]==='[Object Promise]')
                MyPromise.resolve(promiseArr[i]).then(value=>{
                    res[i]=value
                    count++
                    if(count===promiseArr.length){
                        resolve(res)
                    }
                }).catch(e=>reject(e))
            }
        })
    }
    static race(promiseArr){
        return new Promise((resolve,reject)=>{
            if(!Array.isArray(promiseArr)){
                return reject(new Error("传入的参数不是数组！"))
            }
            for(let i=0;i<promiseArr.length;i++){
                MyPromise.resolve(promiseArr[i]).then(value=>{
                    resolve(value)
                }).catch(e=>{reject(e)})
            }
        })
    }
}


const p1 = new MyPromise((res, rej) => {
    setTimeout(() => {
        res('p1')
    }, 1000)
})

const p2 = new MyPromise((res, rej) => {
    setTimeout(() => {
        res('p2')
    }, 2000)
})

const p3 = new MyPromise((res, rej) => {
    setTimeout(() => {
        res('p3')
    }, 3000)
})

const test = MyPromise.prototype.race([p1, p2, p3])
    .then(res => console.log(res))
    .catch(e => console.log(e))

console.log(test);


// const p4=new Promise()

Promise.prototype.MyAll=function(promises){
    return new Promise((resolve,reject)=>{
        let count=0
        let res=[]
        for(let i=0;i<promises.length;i++){
            Promise.resolve(promises[i]).then(value=>{
                res[i]=value
                count++
                if(count===promise.length){
                    resolve(res)
                }
            }).catch(e=>reject(e))
        }
    })
}