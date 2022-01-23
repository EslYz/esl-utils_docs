/**
 * 反转字符串
 * @param str
 */
export function reverseString(str) {
    // let arr = str.split('')
    let arr = [...str]
    arr.reverse()
    return arr.join('')
}

/**
 * 判断是不是回文
 * @param str
 * @returns {boolean}
 */
export function palindrome(str) {
    return reverseString(str) === str
}

/**
 * 字符串截断，并加上...
 * @param str
 * @param size
 */
export function truncate(str, size) {
    if (str.length <= size) {
        return str
    }
    return str.slice(0, size) + '...'
}