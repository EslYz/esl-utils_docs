
const eventBus = {
    // 保存类型与回调的容器
    _callbacks: {}
}

/**
 * 绑定事件
 * @param type
 * @param callback
 */
eventBus.on = function(type, callback) {
    if (this._callbacks[type]) {
        this._callbacks[type].push(callback)
    } else {
        this._callbacks[type] = [callback]
    }
}
/**
 * 触发事件
 * @param type
 * @param data
 */
eventBus.emit = function (type, data) {
    if (!this._callbacks[type] || !this._callbacks[type].length) {
        return
    }
    this._callbacks[type].forEach(cb => {
        cb(data)
    })
}
eventBus.off = function (eventName) {
    if (eventName) {
        delete this._callbacks[eventName]
    } else {
        // 删除所有事件
        this._callbacks = {}
    }
}
export default eventBus