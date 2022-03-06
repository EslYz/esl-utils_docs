export function once(func) {
    let tag = true
    return function () {
        if (tag) {
            func.apply(null, arguments)
            tag = false
        }
    }
}
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
export function bind2(obj, arg) {
    arg = Array.prototype.splice.call(arguments, 1)
    let context = this
    return function (newArg) {
        arg = arg.concat(Array.prototype.slice.call(newArg))
        return context.apply(obj, arg)
    }
}
export function bind(Fn, obj, ...args) {
    return function (args2) {
        if (obj === undefined || obj === null) {
            obj = window
        }
        obj.__tmpFn = Fn
        const __result = obj.__tmpFn(...args, ...args2)
        delete obj.__tmpFn
        return __result
    }
    // return (...args2) => {
    //     return call(Fn, obj, ...args, ...args2)
    // }
}

/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次/wait
 * @param func 回调函数
 * @param wait 执行间隔
 * @param options 如果想忽略开始函数的调用，传入 {leading: false}
 *                如果想忽略结尾函数的调用，传入 {trailing: false}
 *                两者不能共存，否则函数不能执行
 * @ function     返回客户调用函数
 */
export function throttle(func, wait, options) {
    let context, args, result
    let timeout = null
    // 之前的时间戳
    let previous = 0
    if(!options) options = {}
    // 定时器回调函数
    let later = function () {
        // 如果设置了 leading，就将previous 设置为0
        previous = options.leading === false  ? 0 : Date.now()
        // 置空一是为了防止内存泄露，二是为了下面的定时器判断
        timeout = null
        result = func.apply(context, args)
        if (!timeout) context = args = null
    }
    return function () {
        let now = Date.now()
        // 首次进入前者肯定为true
        // 如果需要第一次不执行函数 就将上次时间戳设为当前事件
        if (!previous && options.leading === false) previous = now
        // 计算剩余时间
        let remaining = wait - (now - previous)
        context = this
        args = arguments
        // 如果当前调用已经大于上次调用时间 + wait
        // 或者用户手动调了时间
        // 如果设置了 trailing，只会进入这个条件
        // 如果没有设置leading，那么第一次会进入这个条件
        // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个if条件了
        // 其实还是会进入的，因为定时器的延时
        // 并不是准确的时间，很可能设置2s，需要2.2s才触发，这时候就会进入这个条件
        if (remaining <= 0 || remaining > wait) {
            // 如果存在定时器就清理掉，否则会二次调用
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            result = func.apply(context, args)
            if (!timeout) context = args = null
        } else if (!timeout && options.trailing !== false) {
            // 判断是否设置了定时器和 trailing
            // 没有的话开启一个定时器
            timeout = setTimeout(later, remaining)
        }
        return result
    }
}

/**
 *
 * @param func
 * @param wait
 * @param immediate
 * @return {(function(): void)|*}
 * @private
 */
export function debounce(func, wait, immediate) {
    let timer, context, args
    // 延迟执行函数
    const later = () => setTimeout(() => {
        // 延迟执行函数执行完毕，清空缓存的定时器序号
        timer = null
        // 延迟执行的情况下，函数会在延迟函数中执行
        // 使用到之前缓存的参数和上下文
        if (!immediate) {
            func.apply(context, args)
        }
        context = args = null
    }, wait)
    return function (...params) {
        // 如果没有创建延迟执行函数(later)，就创建一个
        if (!timer) {
            timer = later()
            // 如果是立即执行函数，调用函数
            if (immediate) {
                func.apply(this, params)
            } else {
                // 否则缓存参数和调用上下文
                context = this
                args = params
            }
        } else {
            // 如果已经有延迟执行函数，调用的是清除原来的并重新设定一个
            clearTimeout(timer)
            timer = later()
        }
    }
}