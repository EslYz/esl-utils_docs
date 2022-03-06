import Vue from 'vue'
import App from './App.vue'
import Directives from './directives'
import LazyLoad from './directives/lazyload'
Vue.config.productionTip = false
Vue.use(LazyLoad)
Vue.use(Directives)
new Vue({
  render: h => h(App),
}).$mount('#app')
