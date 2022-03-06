const draggable = {
    inserted: function(el, binding){
        let self= el;  //获取当前元素
        self.onmousedown = (e) => {
            //鼠标相对拖动元素的位置 + 父元素距离边界距离
            let disX = e.clientX - self.offsetLeft;
            let disY = e.clientY - self.offsetTop;
            let top;
            let left;
            document.onmousemove = (e)=>{
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let faDiv = self.parentNode;
                // 判断上左边界
                left = e.clientX < disX ? 0 : e.clientX - disX;
                top = e.clientY < disY ? 0 : e.clientY - disY;
                // 判断右下边界
                if(left > faDiv.offsetWidth - self.offsetWidth) {
                    left = faDiv.offsetWidth - self.offsetWidth
                }
                if(top > faDiv.offsetHeight - self.offsetHeight) {
                    top = faDiv.offsetHeight - self.offsetHeight
                }
                // 使用百分百赋值实现自适应
                self.style.left = left / faDiv.offsetWidth * 100 + '%';
                self.style.top = top / faDiv.offsetHeight * 100 + '%';

            };
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                // 鼠标抬起事件回调返回id及位置参数
                binding.value({ id: el.id, top: self.style.top, left: self.style.left });
            };
        };
    }
}
export default draggable