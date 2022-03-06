function debounce(func, wait, params) {
    let timer
    let context
    let event
    let later = () => setTimeout(() => {
        if (timer) {
            timer = null
        }
        func.call(context, params,event)
        if (!timer) context = null
    }, wait)
    return function (...e) {
        event = e
        context = this
        if (timer) {
            clearTimeout(timer)
            timer = later()
        } else {
            timer = later()
        }
    }
}
export default {
    bind(el, binding) {
        let r = debounce(binding.value.func, binding.value.wait, binding.value.params)
        el.addEventListener('click', r)
    }
}