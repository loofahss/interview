//节流 ：n秒内触发某事件只执行一次
//防抖 ：n秒内触发某事件只执行最后一次

//节流场景
//当用户滚动页面时，节流可以限制加载更多内容的请求频率，
// 以避免过于频繁的请求导致性能下降
//当用户输入时，防抖会等待用户停止输入一段时间（如300毫秒）后再发送请求。
//这意味着如果用户连续输入，只有最后一次输入后才会触发请求。比如在线协同文档



//第一次调用可能会失效
function throttled(fn,delay){
    let oldtime=Date.now()//函数创建时的时间
    return function(...args){
        let newtime=Date.now()//函数调用时的时间
        if(newtime-oldtime>=delay){
            fn.apply(null,args)
            oldtime=Date.now()
        }
    }
}

//在delay后第一次调用，计时器为空的时候才触发下一次点击事件
function throttled2(fn,delay){
    let timer=null
    return function(...args){
        if(!timer){
            timer=setTimeout(()=>{
                fn.apply(this,args)
                timer=null
            },delay)
        }
    }
}


//计算触发时间到下一次delay结束的剩余时间，用setTimeout延迟执行
function throttled3(fn,delay){
    let timer=null
    let starttime=Date.now()
    return function(){
        let curTime=Date.now()
        let remaining=delay-(curTime-starttime)
        let context=this
        let args=arguments
        clearTimeout(timer)
        if(remaining<=0){
            fn.apply(context,args)
            starttime=Date.now()
        }else{
            timer=setTimeout(fn,remaining)
        }
    }
}


//防抖
//场景 搜索框搜索输入 窗口调整大小时，等待窗口调整完成再重新渲染
// 搜索联想功能：在用户输入时，防抖会限制请求的发送频率
// 支付按钮：防止用户多次点击支付按钮，导致重复支付请求
function debounce(fn,wait){
    let timer
    return function(){
        let context=this
        let args=arguments
        clearTimeout(timer)
        timer=setTimeout(function(){
            fn.apply(context,args)
        },wait)
    }
}