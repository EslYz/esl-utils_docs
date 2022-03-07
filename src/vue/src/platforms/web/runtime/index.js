import Vue from '../../../core/index'
import { mountComponent } from '../../../core/instance/lifecycle'
import { query } from '../util/index'

Vue.prototype.$mount = function (el, hydrating) {
    el = el && query(el)
    return mountComponent(this, el, hydrating)
}

export default Vue