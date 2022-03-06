# call apply bind debounce throttle

```javascript
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
export function throttle(callback, wait, options = {}) {
    let timer, result, context, args
    let previous = 0
    let later = () => {
        previous = options.leading === false ? 0 : Date.now()
        timer = null
        result = callback.apply(context, args)
        if (!timer) context = args = null
    }
    return function (...params) {
        let now = Date.now()
        if (!previous && options.leading === false) {
            previous = now
        }
        let remaining = wait - (now - previous)
        context = this
        args = params
        if (remaining <= 0 || remaining > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            result = callback.apply(context, params)
            if (!timer) context = args = null
        } else if (options.trailing !== false && !timer) {
            timer = setTimeout(later, remaining)
        }
        return result
    }
}

export function debounce(callback, wait, immeidate) {
    let timer, context, args
    let later = () => setTimeout(() => {
        timer = null
        if (!immeidate) {
            callback.apply(context, args)
            context = args = null
        }
    }, wait)
    return function (...params) {
        if (timer) {
            clearTimeout(timer)
            timer = later()
        } else {
            timer = later()
            if (immeidate) {
                callback.apply(this, params)
            } else {
                context = this
                args = params
            }
        }
    }
}
```