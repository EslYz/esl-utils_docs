import Watcher from '../observer/watcher'
import {noop} from '../util/index'
export function mountComponent(vm, el, hydrating) {
    vm.$el = el
    let updateComponent
    updateComponent = () => {
        vm._update(vm._render(), hydrating)
    }
    console.log(vm._render())
    new Watcher(vm, updateComponent, noop, {
        before() {}
    }, true)

    return vm
}

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
        console.log('_update,', vnode)
    }
}
