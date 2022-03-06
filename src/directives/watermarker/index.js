function addWaterMark(str, parentNode, font, textColor) {
    let can = document.createElement('canvas')
    parentNode.appendChild(can)
    can.width = 200
    can.height = 150
    can.style.display = 'none'
    let cans = can.getContext('2d')
    cans.rotate((-20 * Math.PI) / 180)
    cans.font = font || '16px Microsoft JhengHei'
    cans.fillStyle = textColor || 'rgba(180, 180, 180, .3)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 10, can.height / 2)
    parentNode.style.backgroundImage = 'url(' +  can.toDataURL('image/png') + ')'
}
const waterMarker = {
    bind: function (el, binding) {
        addWaterMark(binding.value.text, el, binding.value.font, binding.value.textColor)
    }
}
export default waterMarker