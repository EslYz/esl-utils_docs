(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    class VNode{
        constructor(tag, data, children,text,elm, context,componentOptions, asyncFactory) {
            this.tag = tag;
            this.data = data;
            this.children = children;
            this.text = text;
            this.elm = elm;
            this.ns = undefined;
            this.context = context;
            this.componentOptions = componentOptions;
            this.asyncFactory = asyncFactory;
        }
    }

    function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
        return _createElement(context, tag, data, children)
    }
    function _createElement(context, tag, data, children, normalizationType){
        let vnode;
        if (typeof tag === 'string') {
            // todo
            vnode = new VNode(
                tag, data, children, undefined, undefined, context
            );
        }
        return vnode
    }

    function initRender(vm) {
        vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c);
    }

    function renderMixin(Vue) {
        Vue.prototype._render = function () {
            let vnode;
            const vm = this;
            const { render } = vm.$options;
            vnode = render.call(vm._renderProxy, vm.$createElement);
            return vnode
        };
    }

    let initProxy;

    initProxy = function (vm) {
        vm._renderProxy = vm;
    };

    function initMixin(Vue) {
        Vue.prototype._init = function (options) {
            const vm = this;
            if (options && options._isComponent) ; else {
                vm.$options = options;
            }
            initProxy(vm);
            initRender(vm);

            if (vm.$options.el) {
                console.log('vue init func el = ', vm.$options.el);
                vm.$mount(vm.$options.el);
            }
        };
    }

    function Vue(options) {
        // if (
        //     !(this instanceof Vue)
        // ) {
        //     console.warn('Vue is a constructor and should be called with the `new` keyword')
        // }
        this._init(options);
    }

    initMixin(Vue);
    renderMixin(Vue);

    class Watcher{
        constructor(vm, expOrFn, cb, options, isRenderWatcher) {
            console.log(vm);
        }
    }

    function noop(a, b, c) {}

    function mountComponent(vm, el, hydrating) {
        vm.$el = el;
        let updateComponent;
        updateComponent = () => {
            vm._update(vm._render(), hydrating);
        };
        console.log(vm._render());
        new Watcher(vm, updateComponent, noop, {
            before() {}
        }, true);

        return vm
    }

    function query(el) {
        console.log(el);
        if (typeof el === 'string') {
            const selected = document.querySelector(el);
            if (!selected) {
                return document.createElement('div')
            }
            return selected
        } else {
            return el
        }
    }

    Vue.prototype.$mount = function (el, hydrating) {
        el = el && query(el);
        return mountComponent(this, el, hydrating)
    };

    const mount = Vue.prototype.$mount;

    Vue.prototype.$mount = function (el, hydrating) {
        el = el && query(el);
        const options = this.$options;
        if (!options.render) {
            let template = options.template;
            if (template) {
                if (typeof template === 'string') {
                    if (template.charAt(0) === '#') ;
                } else if (template.nodeType) ; else {
                    return this
                }
            }
            if (template) {
                let render = function () {
                    return 'try to create vnode'
                };
                options.render = render;
            }
        }
        return mount.call(this, el, hydrating)
    };

    return Vue;

})));
