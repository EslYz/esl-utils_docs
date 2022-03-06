const Promise = require("./Promise1")

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
                resolve(e)
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

// Promise.defer = Promise.deferred = function() {
//     let dfd = {}
//     dfd.promise = new Promise((resolve, reject) => {
//         dfd.resolve = resolve
//         dfd.reject = reject
//     })
//     return dfd
// }
// module.exports = Promise