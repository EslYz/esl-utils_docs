import VNode from './VNode'


export function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
    return _createElement(context, tag, data, children, normalizationType)
}

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2
export function _createElement(context, tag, data, children, normalizationType){
    let vnode
    if (normalizationType === ALWAYS_NORMALIZE) {
    } else if (normalizationType === SIMPLE_NORMALIZE) {
    }
    if (typeof tag === 'string') {
        // todo
        vnode = new VNode(
            tag, data, children, undefined, undefined, context
        )
    }
    return vnode
}