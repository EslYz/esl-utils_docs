/**
 * 根据构造函数创建实例对象
 */
export function newInstance(Fn, ...args) {
    // 1. 创建一个新对象
    const obj = {}
    // 2. 修改函数内部this 指向新对象，并执行
    const result = Fn.call(obj, ...args)
    // 3. 返回新对象
    obj.__proto__ = Fn.prototype
    return result instanceof Object ? result : obj
}

/**
 * @param obj
 * @param Fm
 */
export function insOf(obj, Fn) {
    let prototype = Fn.prototype
    let proto = obj.__proto__
    //遍历原型链
    while (proto) {
        if (proto === prototype) return true
        proto = proto.__proto__
    }
    return false
}

/**
 * 合并对象，同名属性合并成数组
 * @param objs
 */
export function mergeObject(...objs) {
    const result = {}
    // 遍历所有参数对象
    objs.forEach(obj => {
        // 获取当前对象所有的属性
        Object.keys(obj).forEach(key => {
            // 检测result中是否存在 key 属性
            if (result.hasOwnProperty(key)) {
                result[key] = [].concat(result[key], obj[key])
            } else {
                result[key] = obj[key]
            }
        })
    })
    return result
}

/**
 * 浅拷贝，es6扩展运算符实现
 * @param {*}
 */
export function clone1(target) {
    if (typeof target === 'object' && target !== null) {
        if (Array.isArray(target)) {
            return [...target]
        } else {
            return {...target}
        }
    } else {
        return target
    }
}

/**
 * es5 实现 浅拷贝
 * @param target
 * @returns {*[]|*}
 */
export function clone2(target) {
    if (typeof target === "object" && target !== null) {
        const result = Array.isArray(target) ? [] : {}
        for (let key in target) {
            // hasOwnProperty,不会判断原型对象上是否包含key
            if (target.hasOwnProperty(key)) {
                result[key] = target[key]
            }
        }
        return result
    }
    return target
}

/**
 * json 实现深拷贝
 * 缺点：
 *      1.不能复制 函数类型的 属性
 *      2.无法解决循环引用问题
 * @param target
 * @returns {any}
 */
export function deepClone1(target) {
    let str = JSON.stringify(target)
    return JSON.parse(str)
}

/**
 * 基础版本 递归实现深拷贝
 * 无法解决循环引用
 * @param target
 */
export function deepClone2(target) {
    if (typeof target === 'object' && target !== null) {
        const result = Array.isArray(target) ? [] : {}
        for (let key in target) {
            // 检测该属性是否为对象本身的属性，不能拷贝原型对象的属性
            if (target.hasOwnProperty(key)) {
                result[key] = deepClone2(target[key])
            }
        }
        return result
    }
    return target
}

/**
 * 解决循环引用问题，
 * 待优化：for in 循环会遍历原型链上的属性
 * @param target
 * @param map
 * @returns {*[]|any}
 */
export function deepClone3(target, map=new Map()) {
    if (typeof target === 'object' && target !== null) {
        // 克隆数据之前判断数据之前是否克隆过
        let cache = map.get(target)
        if (cache) {
            return cache
        }
        const result = Array.isArray(target) ? [] : {}
        map.set(target, result)
        for (let key in target) {
            // 检测该属性是否为对象本身的属性，不能拷贝原型对象的属性
            if (target.hasOwnProperty(key)) {
                result[key] = deepClone3(target[key], map)
            }
        }
        return result
    }
    return target
}

/**
 * 深拷贝终极版
 * @param target
 * @param map
 * @returns {*[]|any}
 */
export function deepClone(target, map=new Map()) {
    if (typeof target === 'object' && target !== null) {
        // 克隆数据之前判断数据之前是否克隆过
        let cache = map.get(target)
        if (cache) {
            return cache
        }
        let isArr = Array.isArray(target)
        const result = isArr ? [] : {}
        map.set(target, result)
        if (isArr) {
            target.forEach((item, index) => {
                result[index] = deepClone(item, map)
            })
        } else {
            Object.keys(target).forEach(key => {
                result[key] = deepClone(target[key], map)
            })
        }
        return result
    }
    return target
}
