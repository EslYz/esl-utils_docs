

export function addEventListener(el, type, fn, selector) {
    if (typeof el === 'string') {
        el = document.querySelector(el)
    }
    // 没有子元素选择器，则给 el 元素绑定事件
    if (!selector) {
        el.addEventListener(type, fn)
    } else {
        el.addEventListener(type,function (e) {
            const target = e.target
            // 判断选择器与目标元素是否相符合
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        })
    }
}