# promise源码

```javascript

function Promise(executor) {
    let self = this
    self.status = 'pending'
    self.data = null
    self.resolveCallback = []
    self.rejectCallback = []

    function resolve(data) {
        if (data instanceof Promise) {
            return data.then(resolve, reject)
        }
        if (self.status !== 'pending') {
            return
        }
        setTimeout(() => {
            self.data = data
            self.status = 'fulfilled'
            self.resolveCallback.forEach(e => {
                e(data)
            })
        });
    }
    function reject(error) {
        if (self.status !== 'pending') {
            return
        }
        setTimeout(() => {
            self.data = error
            self.status = 'rejected'
            self.rejectCallback.forEach(e => {
                e(error)
            })
        });
    }
    try {
        executor(resolve, reject)
    } catch(e) {
        reject(e)
    }
}
Promise.prototype.then = function (onResolved, onRejected) {
    if (typeof onResolved !== 'function') onResolved = data => data
    if (typeof onRejected !== 'function') onRejected = reason => { throw reason }
    let self = this
    let promise
    return promise = new Promise((resolve, reject) => {
        if (this.status === 'pending') {
            //
            self.resolveCallback.push(function (data) {
                try{
                    let x = onResolved(data)
                    resolvePromise(promise, x, resolve, reject)
                } catch(e) {
                    reject(e)
                }
            })
            self.rejectCallback.push(function (reason) {
                try{
                    let x = onRejected(reason)
                    resolvePromise(promise, x, resolve, reject)
                } catch(e) {
                    reject(e)
                }
            })
        }
        if (self.status === 'fulfilled') {
            setTimeout(() => {
                try {
                    let x = onResolved(self.data)
                    resolvePromise(promise, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        }
        if (self.status === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onRejected(self.data)
                    resolvePromise(promise, x, resolve, reject)
                }catch(e) {
                    reject(e)
                }
            })
        }
    })
}

function resolvePromise(promise2, x, resolve, reject) {
    let then
    let thenCalledOrThrow = false
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'))
    }
    if (x instanceof Promise) {
        if (x.status === 'pending') {
            x.then(function (v) {
                resolvePromise(promise2, v, resolve, reject)
            }, reject)
        } else {
            x.then(resolve, reject)
        }
        return
    }
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
        try {
            then = x.then
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    if (thenCalledOrThrow) return
                    thenCalledOrThrow = true
                    return resolvePromise(promise2, y, resolve, reject)
                }, function (r) {
                    if (thenCalledOrThrow) return
                    thenCalledOrThrow = true
                    return reject(r)
                })
            } else {
                resolve(x)
            }
        } catch(e) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return reject(e)
        }
    } else {
        resolve(x)
    }
}

Promise.prototype.catch = function(onrejected) {
    this.then(null, onrejected)
}
Promise.prototype.done = function() {
    return this.catch(e => {
        console.error(e)
    })
}
Promise.prototype.resolve = function(value) {
    return new Promise(r => {
        r(value)
    })
}
Promise.prototype.reject = function(reason) {
    return new Promise((_, e) => {
        e(reason)
    })
}
Promise.prototype.race = function (promises) {
    return new  Promise((resolve, reject) => {
        for(let i = 0; i < promises.length; i++) {
            promises[i].then(r => {
                resolve(r)
            }, e => {
                reject(e)
            })
        }
    })
}
Promise.prototype.all = function (promises) {
    return new  Promise((resolve, reject) => {
        let count = 0
        let ans = []
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                //
                ans[i] = v
                count++
                if (count === promises.length) {
                    resolve(ans)
                }
            }, r => {
                reject(r)
            })
        }
    })
}
// 测试用到的
// npm run promises-aplus-tests promise.js
// Promise.defer = Promise.deferred = function() {
//     let dfd = {}
//     dfd.promise = new Promise((resolve, reject) => {
//         dfd.resolve = resolve
//         dfd.reject = reject
//     })
//     return dfd
// }
// module.exports = Promise
```

## 接口请求超时
>思路，接口请求和延时函数赛跑，并使用一个Promise包裹，由于Promise状态不可逆，所以接口请求先跑完则说明未超时，且Promise的状态是fulfilled，
> 反之就是超时，状态是reject

```javascript
/**
 * 模拟超时
 * @param delay
 * @return {Promise<unknown>}
 */
function sleep(delay) {
    return new Promise((_, reject) => {
        setTimeout(() => reject('调用超时'), delay)
    })
}

/**
 * 模拟请求，假设请求需要1s
 */
function request() {
    return new Promise(resolve => {
        setTimeout(() => resolve('请求成功'), 1000)
    })
}
function timeoutPromise(requestFn, delay) {
    return new Promise((resolve, reject) => {
        const promises = [requestFn(), sleep(delay)]
        for (const promise of pormises) {
            promise.then(res => resolve(res), err => reject(err))
        }
    })
}
function timeoutPromise2(requestFn, delay) {
    return Promise.race([requestFn(), sleep(delay)])
}

// 500 < 1000 超时
timeoutPromise(request, 500).catch(err => console.log(err))
// 不超时
timeoutPromise2(request, 2000).then(res => console.log(res))
```

## 控制并发的Promise调度器
```javascript
class Scheduler{
    constructor(limit) {
        this.queue = []
        this.limit = limit
        this.count = 0
    }
    add(time,order) {
        const promiseCreator = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(order)
                    resolve()
                }, time)
            })
        }
        this.queue.push(promiseCreator)
    }
    taskStart() {
        for(let i = 0; i < this.limit; i++) {
            this.request()
        }
    }
    request() {
        if (!this.queue.length || this.count >= this.limit) return
        this.count++
        this.queue.shift()().then(() => {
            this.count--
            this.request()
        })
    }
}
// 测试
const scheduler = new Scheduler(2)
const addTask = (time, order) => {
    scheduler.add(time, order)
}
addTask(1000, 'a')
addTask(500, 'b')
addTask(300, 'c')
addTask(400, 'd')
scheduler.taskStart()
/**
 * a和b一起执行，500ms时，b执行完，输出b，然后c进队列并执行
 * 800ms时，c执行完，输出c，然后d进队列并执行
 * 1000ms时，a执行完，输出a，1200ms时d执行
 * 
 */
```

## 取消重复请求
```javascript
class CancelblePromise{
    constructor(){
        this.pendingPromise = null
        this.reject = null
    }
    request(fn) {
        if (this.pendingPromise) {
            this.cancel('取消重复请求')
        }
        const promise = new Promise((_,reject) => this.reject = reject)
        // promise 永远不可能跑赢 fn()返回的promise。。。
        this.pendingPromise = Promise.race([fn(), promise])
        return this.pendingPromise
    }
    cancel(reason) {
        this.reject(reason)
        this.pendingPromise = null
    }
}
function request(delay) {
    return () => new Promise(resolve => {
        setTimeout(() => {
            resolve('请求成功')
        }, delay)
    })
}
const cancelPromise = new cancelPromise()
for (let i = 0; i < 5; i++) {
    cancelPromise
        .request(request(2000))
        .then(res => console.log(res))
        .catch(err => console.error(err)) // 前四个取消重复请求
}
```

## 全局loading
```javascript
class PromiseManager{
    constructor() {
        this.pendingPromise = new Set()
        this.loading = fasle
    }
    generateKey() {
        return `${Date.now()}-${parseInt(Math.random() * 1000)}`
    }
    push(...reqFns) {
        for (const fn of reqFns) {
            const key = this.generateKey()
            this.pendingPromise.add(key)
            fn().finally(() => {
                this.pendingPromise.delete(key)
                this.loading = this.pendingPromise.size !== 0
            })
        }
    }
}
// 模拟请求
function request(delay) {
    return () => {
        return new Promise(resolve => {
            setTimeout(() => resolve('成功喽'), delay)
        })
    }
}
const manager = new PromiseManager()
manager.push(request(1000), request(2000), request(800), request(2000), request(1500))
const timer = setInterval(() => {
    // 轮询查看loading状态
    console.log(manager.loading)
}, 300)
```