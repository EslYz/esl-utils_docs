# pubSub 事件总线
```javascript

const PubSub = {
    // 订阅的唯一id
    id: 1,
    // 频道与回调的记录
    _callbacks: {}
}

PubSub.subscribe = function(channel, callback) {
    // 创建唯一编号
    let token = 'token_' + this.id++
    // 判断_callbacks属性中是否存在  channel
    if (this._callbacks[channel]) {
        this._callbacks[channel][token] = callback
    } else {
        this._callbacks[channel] = {
            [token]: callback
        }
    }
    return token
}
/**
 * 没传值，取消所有订阅
 * 传入token 取消指定的token的订阅
 * 传入频道 取消频道下所有订阅
 * @param flag
 */
PubSub.unsubscribe = function (flag) {
    if (!flag) {
        this._callbacks = {}
    } else if (typeof flag === 'string') {
        // 判断是否为  token_ 开头
        if (flag.indexOf('token_') === 0) {
            let callbackObj = Object.values(this._callbacks).find(obj => obj.hasOwnProperty(flag))
            if (callbackObj) {
                delete callbackObj[flag]
            }
        } else {
            delete this._callbacks[flag]
        }
    }
}
PubSub.publish = function (channel, data) {
    if (!this._callbacks[channel]) {
        return
    }
    Object.values(this._callbacks[channel]).forEach(cb => {
        cb(data)
    })
}

export default PubSub
```

```javascript

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
```