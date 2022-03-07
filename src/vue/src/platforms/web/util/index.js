

export function query(el) {
    console.log(el)
    if (typeof el === 'string') {
        const selected = document.querySelector(el)
        if (!selected) {
            return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}