const copy = {
    bind(el, {value}) {
        el.$value = value
        el.handler = () => {
            if (!el.$value) {
                // 值为空的时候给出提示，可根据项目UI仔细设计
                console.log('无复制内容')
                return
            }
            // 动态创建 textarea标签
            const textarea = document.createElement('textarea')
            // 防止IOS下自动唤起键盘
            textarea.readOnly = 'readonly'
            textarea.style.position = 'absolute'
            textarea.style.left = '-9999px'
            textarea.value = el.$value
            document.body.appendChild(textarea)
            textarea.select()
            const result = document.execCommand('Copy')
            if (result) {
                // 可根据UI设计
                console.log('复制成功')
            }
            document.body.removeChild(textarea)
        }
        // 绑定事件，一键Copy
        el.addEventListener('click', el.handler)
    },
    componentUpdated(el, {value}) {
        el.$value = value
    },
    unbind(el) {
        el.removeEventListener('click', el.handler)
    }
}
export default copy