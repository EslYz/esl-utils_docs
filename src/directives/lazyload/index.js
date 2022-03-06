const LazyLoad = {
    install(Vue, options) {
        // const defaultSrc = options.default
        Vue.directive('lazy', {
            bind(el, binding) {
                LazyLoad.init(el, binding.value)
            },
            inserted(el) {
                if (IntersectionObserver) {
                    LazyLoad.observe(el)
                } else {
                    LazyLoad.listenerScroll(el)
                }
            }
        })
    },
    init(el, val, def) {
        el.setAttribute('data-src', val)
        // el.setAttribute('src', def)
    },
    observe(el) {
        let io = new IntersectionObserver(entries => {
            const realSrc = el.dataset.src
            if (entries[0].isIntersecting) {
                if (realSrc) {
                    el.src = realSrc
                    el.removeAttribute('data-src')
                }
            }
        })
        console.log('observe exe', io)
        io.observe(el)
    },
    listenerScroll(el) {
        const handler = LazyLoad.throttle(LazyLoad.load, 300)
        LazyLoad.load(el)
        window.addEventListener('scroll', () => {
            handler(el)
        })
    },
    load(el) {
        console.log('load exec')
        const windowHeight = document.documentElement.clientHeight
        const elTop = el.getBoundingClientRect().top
        const elBtm = el.getBoundingClientRect().bottom
        const realSrc = el.dataset.src
        if (elTop - windowHeight < 0 && elBtm > 0) {
            if(realSrc) {
                el.src = realSrc
                el.removeAttribute('data-src')
            }
        }
    },
    throttle(fn, delay) {
        let timer
        let prevTime
        let context,args
        let later = () => {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            fn.apply(context, args)
            if (!timer) context = args = null
        }
        return function (...params) {
            context = this
            args = params
            let now = Date.now()
            let remaining = delay - (now - prevTime)
            if (remaining <= 0 || remaining > delay) {
                if (timer) {
                    clearTimeout(timer)
                    timer = null
                }
                fn.apply(this, params)
            } else {
                timer = setTimeout(later, remaining)
            }
        }
    }
}
export default LazyLoad