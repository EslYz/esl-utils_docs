/**
 * 对数组中每一项执行 callback函数
 * @param arr
 * @param callback
 * @returns {*[]}
 */
export function map(arr, callback) {
    let result = []
    for(let i = 0,len = arr.length; i<len;i++) {
        result.push(callback(arr[i], i))
    }
    return result
}

/**
 * 初始值为initValue，
 * 执行callback函数时，会传入上一次callback函数执行的结果
 * @param arr
 * @param callback
 * @param initValue
 * @returns {*}
 */
export function reduce(arr, callback, initValue) {
    let result = initValue
    for (let i = 0,len = arr.length; i < len; i++) {
        result = callback(result, arr[i])
    }
    return result
}

/**
 * 过滤数组==
 * 将callback的返回值 放到返回结果中
 * @param arr
 * @param callback
 */
export function filter(arr, callback) {
    let result = []
    for (let i = 0, len = arr.length; i < len; i++) {
        if(callback(arr[i], i)) {
            result.push(arr[i])
        }
    }
    return result
}

export function find(arr, callback) {
    for(let i = 0, len = arr.length; i < len; i++) {
        if (callback(arr[i], i)) {
            return arr[i]
        }
    }
}
export function findIndex(arr, callback) {
    for(let i = 0, len = arr.length; i < len; i++) {
        if (callback(arr[i], i)) {
            return i
        }
    }
    return -1
}

/**
 * 每个都满足callback，返回true，否则返回false
 * @param arr
 * @param callback
 * @returns {boolean}
 */
export function every(arr, callback) {
    for (let i = 0, len = arr.length; i < len; i++) {
        if (!callback(arr[i], i)) {
            return false
        }
    }
    return true
}

/**
 * 有一个满足 callback，就返回true
 * 都不满足返回false
 * @param arr
 * @param callback
 * @returns {boolean}
 */
export function some(arr, callback) {
    for (let i = 0, len = arr.length; i < len; i++) {
        if (callback(arr[i], i)) {
            return true
        }
    }
    return false
}

/**
 * 去重
 */
export function unique1(arr) {
    let res = []
    arr.forEach(item => {
        if (res.indexOf(item) === -1) {
            res.push(item)
        }
    })
    return res
}
export function unique2(arr) {
    const result = []
    const obj = {}
    arr.forEach(item => {
        if (!obj[item]) {
            obj[item] = true
            result.push(item)
        }
    })
    return result
}
export function unique(arr) {
    return [...new Set(arr)]
}

export function concat(arr, ...args) {
    const r = [...arr]
    args.forEach(item => {
        if (Array.isArray(item)) {
            r.push(...item)
        } else {
            r.push(item)
        }
    })
    return r
}

/**
 * 数组切片，支持负数：倒数第几位开始
 * @param arr
 * @param begin
 * @param end
 * @returns {*[]}
 */
export function slice(arr, begin, end) {
    if (!arr.length) return []
    begin = begin || 0
    let len = arr.length
    if (begin >= len) {
        return []
    }
    end = end || len
    end = end > len ? len : end
    if (end < begin) {
        end = len
    }
    if (begin < 0) {
        begin = len + begin
    }
    const result = []
    for(let i = 0; i < len; i++) {
        if (i >= begin && i < end) {
            result.push(arr[i])
        }
    }
    return result
}

/**
 * 递归实现数组扁平化
 * @param arr
 * @returns {*[]}
 */
export function flatten1(arr) {
    let result = []
    arr.forEach(item => {
        if (Array.isArray(item)) {
            result = concat(result, flatten(item))
        } else {
            result = concat(result, item)
        }
    })
    return result
}

/**
 * 扁平化实现2
 * @param arr
 * @returns {*[]}
 */
export function flatten(arr) {
    let result = [...arr]
    while (result.some(item => Array.isArray(item))) {
        result = [].concat(...result)
    }
    return result
}

/**
 * 数组分组
 * @param arr
 * @param size
 */
export function chunk(arr, size = 1) {
    if (arr.length === 0) return []
    let result = []
    let tmp = []
    arr.forEach(item => {
        if (tmp.length === 0) {
            result.push(tmp)
        }
        tmp.push(item)
        if (tmp.length === size) {
            tmp = []
        }
    })
    return result
}

/**
 * 两个数组的差集
 * @param arr1
 * @param arr2
 * @returns {*[]} 返回新数组
 */
export function difference(arr1, arr2 = []) {
    if (arr1.length === 0) return []
    if (arr2.length === 0) return arr1.slice(0)
    return arr1.filter(item => !arr2.includes(item))
}

/**
 * 删除数组中的元素
 * @param arr
 * @param args
 * @returns {Array} 返回删掉的元素的数组
 */
export function pull(arr, ...args) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (args.includes(arr[i])) {
            result.push(arr[i])
            arr.splice(i, 1)
            i--
        }
    }
    return result
}

/**
 * 返回删除arr中 arr2的所有元素
 * @param arr
 * @param arr2
 */
export function pullAll(arr, arr2) {
    return pull(arr, ...arr2)
}

/**
 * 删除数组左边 count个元素，返回删除后的数组
 * 不会改变原数组
 * @param arr
 * @param count
 */
export function drop(arr, count) {
    // return arr.filter((value, index) => index >= count)
    return arr.slice(count)
}
export function dropRight(arr, size) {
    return arr.filter((v, index) => index < (arr.length - size))
}
