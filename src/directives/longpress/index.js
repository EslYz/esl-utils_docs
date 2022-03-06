const longpress = {
    bind(el, binding, vNode) {
        // el就是标签，所以可以拿到原生标签上的所有属性
        // console.log(el.getAttribute('prop'))// test customer props

        if (typeof binding.value !== 'function') {
            throw 'callback must be a function'
        }
        let pressTimer = null

        let start = (e) => {
            if (e.type === 'click' && e.button !== 0) {
                return
            }
            if (pressTimer === null) {
                pressTimer = setTimeout(() => {
                    handler(vNode)
                }, 2000)
            }
        }
        let cancel = () => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer)
                pressTimer = null
            }
        }
        const handler = (e) => {
            binding.value(e)
        }
        el.addEventListener('mousedown', start)
        el.addEventListener('touchstart', start)
        el.addEventListener('click', cancel)
        el.addEventListener('mouseout', cancel)
        el.addEventListener('touchend', cancel)
        el.addEventListener('touchcancel', cancel)
    },
    componentUpdated(el, { value }) {
        el.$value = value
    },
    unbind(el) {
        el.removeEventListener('click', el.handler)
    }
}
export default longpress