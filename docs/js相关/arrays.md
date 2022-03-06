#

## reduce实现
```javascript
function reduce(arr, callback, initValue) {
    let result = initValue
    for (let i = 0, len = arr.length; i < len; i++) {
        result = callback(result, arr[i], i, arr)
    }
    return result
}
```
## map实现
```javascript
function map(arr, callback) {
    let result = []
    for (let i = 0, len = arr.length; i < len; i++) {
        result.push(callback(arr[i], i, arr))
    }
    return result
}
```