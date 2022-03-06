import copy from './copy'
import longpress from './longpress'
import debounce from './debounce'
import watermarker from './watermarker'
import draggable from './draggable'
const directives = {
    copy,
    longpress,
    debounce,
    watermarker,
    draggable
}
export default {
    install(Vue) {
        Object.keys(directives).forEach(key => {
            Vue.directive(key, directives[key])
        })
    }
}