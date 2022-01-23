export function call(Fn, obj, ...args){
    if (obj === undefined || obj === null) {
        obj = window
    }
    obj.__tmpFn = Fn
    const __result = obj.__tmpFn(...args)
    delete obj.__tmpFn
    return __result
}
export function apply(Fn, obj, args) {
    if (obj === undefined || obj === null) {
        obj = window
    }
    obj.__tmpFn = Fn
    const res = obj.__tmpFn(...args)
    delete obj.__tmpFn
    return res
}
export function bind(Fn, obj, ...args) {
    return (...args2) => {
        return call(Fn, obj, ...args, ...args2)
    }
}

/**
 * 节流，多次触发，wait时间内只会执行一次
 * @param callback
 * @param wait
 * @returns {(function(*=): void)|*}
 */
export function throttle(callback, wait) {
    // 定义一个开始时间
    let start = 0
    // 返回一个函数
    return function (e) {
        // 获取当前时间戳,函数执行的时间
        let now = Date.now()
        if (now - start >= wait) {
            // this 指向事件源
            callback.call(this, e)
            // 修改开始时间
            start = now
        }
    }
}

/**
 * wait时间内多次触发，不会执行回调，仅仅更新执行时间，
 * 会从上一次呗调用后，延迟wait 毫秒后调用callback
 * @param callback
 * @param wait
 * @returns {(function(*))|*}
 */
export function debounce(callback, wait) {
    let timeId = -1
    return function (e) {
        if (timeId !== -1) {
            //清空定时器，让上一个时间回调不执行
            clearTimeout(timeId)
        }
        // 启动定时器
        timeId = setTimeout(() => {
            // 执行回调
            callback.call(this, e)
            timeId = -1
        }, wait)
    }
}