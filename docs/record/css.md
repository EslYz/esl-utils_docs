# CSS相关面试题
## CSS的盒子模型
CSS的盒子模型有哪些：标准盒子模型、IE盒子模型

区别：
1. 标准：margin、border、padding、content
2. margin、content。border、padding包含在content中

-----> 通过CSS 如何转换盒子模型？ 

box-sizing: border-box; // IE盒子模型
> 对于IE盒子模型，如果padding的值大于 样式定义的宽高，实际显示出来的宽度就会超出定义的模型，取最大值

box-sizing: border-box; // 默认是标准模型


## line-height 和 height的区别
1. height就是元素的高度，固定值，不会变
2. line-height是每行文字的高度，如果文字换行则整个盒子的高度会增大(行数*行高)

## CSS选择符有哪些？哪些属性可以继承
 css选择符：
1. 通配 *
2. id选择器 #
3. 类选择器 .
4. 标签选择器  div p h1...
5. 相邻选择器   .li1 + li  选择li1 后面的一个li 
6. 后代选择器   ui li + li   选择ul中除了第一个li的所有li
7. 子元素选择器  >  一个大于符号
8. 属性选择器  a[href]
9. 味蕾选择器


1. css属性哪些可以继承 。文字系列： font-size、color、line-height、list-style、cursor、text-align。。。
2. css属性中不能继承的 border、padding、margin

## css优先级算法如何计算
优先级比较:
!important > 内联 > id > class > 标签 > 通配

css权重计算  !important 权重值最大，权重值大的会覆盖小的
> 第一：内联样式：style 权重值：1000
> <br> 第二：id选择器 权重值：0100
> <br> 第三：类选择器 权重值：0010
> <br>第四:标签&伪元素选择器  权重值： 0001
> <br> 第五：通配符、>、+ 等  权重值：0000 
> 

## css画三角形
用border画
```html
<style>
    div{
        width: 0;
        height: 0;
        
        /*border-left: 100px solid #ccc;  箭头向右
        border-right: 100px solid transparent;
        border-top: 100px solid transparent;
        border-bottom: 100px solid transparent;*/

        border-left: 100px solid transparent;
        border-right: 100px solid #ccc; 
        border-top: 100px solid transparent;
        border-bottom: 100px solid transparent;
    }
</style>
<div></div>
```

## 一个盒子不给宽高，如果实现水平垂直居中
1. 方式一：display: flex; justify-content: center; align-content: center;
2. 方式二：定位 + transform
```html
<style>
    .container{
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-content: center;*/

        position: relative;
        width: 300px;
        height: 300px;
        border: 5px solid #ccc;
    }
    .main{
        position: absolute;
        left: 50%;
        top: 50%;
        background: rebeccapurple;
        transform: translate(-50%, -50%);
    }
</style>
<div class="container">
    <div class="main"></div>
</div>
```
## display有哪些值及作用
1. none   隐藏元素
2. block  把元素转换为块元素
3. inline  转换为内联元素
4. inline-block    转换为行内块元素
5. table === 用表格的形式显示

## BFC规范 块级格式化上下文  block formatting context
BFC 就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
1. BFC原则：如果一个元素具有BFC，内部元素再怎么弄，都不会影响外面的元素
2. 触发BFC：
   1. float的值非 none
   2. overflow的值 非 visible
   3. display的值为  inline-block、、table-cell。。。
   4. position的值为  absolute、fixed
```html
<style>
    ul {
        list-style: none;
        border: 5px solid #ccc;
        overflow: hidden;
    }
    ul li {
        float: left;
        margin: 10px;
        width: 100px;
        height: 100px;
        background: orange;
    }
</style>
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```
## 清除浮动有哪些方式
1. 触发BFC 可以变相的清除浮动，bfc是独立的子元素，内部元素再怎么变化都不会影响外部的内容
2. 在元素后面顶一个盒子 增加一个样式  clear:both;
3. 给元素加一个 :after
```html
ul: after{
    content: '';
    display: block;
    clear: both;
}
```
## 在网页中应该使用奇数还是偶数的字体？为什么
偶数，

方便开发，一般UI设计的时候都是偶数，这样不管是布局也好，转换px也好，都方便计算。例如客户端一般会除2

让文字在浏览器上表现的更好看

## 有几种定位？分别是根据什么定位的？
1. static：默认值没有定位
2. relative：相对已自身定位，不脱离文档流。
3. absolute：相对于第一个有relative的父元素定位.脱离文档流
4. fixed：固定定位，相对于浏览器可视窗口定位(不是文档)，不管父元素在哪。
5. relative：如果有left、right、top、bottom  ---> left top   left会覆盖right  top会覆盖 bottom
6. absolute：如果有left、right、top、bottom  ---> 都会存在

## 写一个左中右占满屏幕，其中左右两块固定宽度200，中间自适应，要求先加载中间块的
```html
双飞翼 布局
<style>
   *{
      margin: 0;
      padding: 0;
   }
   body{
      height: 100vh;
      width: 100%;
   }
   .container > div{
      float: left;
   }
   .l{
      height: 100vh;
      width: 200px;
      background: red;
      margin-left: -100%;
   }
   .r{
      margin-left: -200px;
      height: 100vh;
      width: 200px;
      background: gray;
   }
   .c{
      width: 100%;
      height: 100vh;
      background: pink;
   }
   .main{
      padding: 0 200px;
   }
</style>
<div class="container">
   <div class="c">
      <div class="main">中</div>
   </div>
   <div class="l">左</div>
   <div class="r">右</div>
</div>
```

## css reset
reset.css 是一个css文件，用来重置 css样式的

太过臃肿，一般用 Normalize.css  用于增强浏览器跨平台渲染的的一致性

## css sprite 是什么，有什么优缺点
也叫 雪碧图、精灵图

把多个小图标 合并成一个大图片

优点是减少网络请求，让页面更快的onload

缺点是不利于缓存，一个图标改变，整个文件都要更新，用起来不是那么方便，不利于维护
> 要通过 background-position 加载对应位置的图片













