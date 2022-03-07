(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{394:function(a,e,s){a.exports=s.p+"assets/img/webpack_01.c103c58c.png"},441:function(a,e,s){"use strict";s.r(e);var t=s(49),l=Object(t.a)({},(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"webpack相关内容-详细版本"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#webpack相关内容-详细版本"}},[a._v("#")]),a._v(" webpack相关内容 "),t("a",{attrs:{href:"https://juejin.cn/post/6844904094281236487",target:"_blank",rel:"noopener noreferrer"}},[a._v("详细版本"),t("OutboundLink")],1)]),a._v(" "),t("p",[t("img",{attrs:{src:s(394),alt:"img.png"}})]),a._v(" "),t("h2",{attrs:{id:"loader的作用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#loader的作用"}},[a._v("#")]),a._v(" loader的作用")]),a._v(" "),t("p",[a._v("webpack只认识json和js文件，其他类型都处理不了，loader的作用就是将webpack不认识的内容转化为认识的内容。")]),a._v(" "),t("ol",[t("li",[a._v("css-loader：解析css样式资源")]),a._v(" "),t("li",[a._v("style-loader：创建style标签并放在html的head中")]),a._v(" "),t("li",[a._v("postcss-loader：自动添加css3部分属性的浏览器前缀")]),a._v(" "),t("li",[a._v("less-loader：处理less样式资源")]),a._v(" "),t("li",[a._v("sass-loader：处理saas样式资源")]),a._v(" "),t("li",[a._v("file-loader: 解决图片引入问题，并将图片copy到指定目录，默认为dist")]),a._v(" "),t("li",[a._v("url-loader: 解依赖file-loader，当图片小于limit时，会将图片转为base64，大于limit依然使用file-loader拷贝")]),a._v(" "),t("li",[a._v("img-loader：压缩图片")]),a._v(" "),t("li",[a._v("babel-loader：使用babel加载ES2015+ 代码兵将其转换为ES5")]),a._v(" "),t("li",[a._v("thread-loader：多进程配置。实际上在小型项目中，开启多进程打包反而会增加时间成本，因为启动进程和进程间通信都会有一定开销")])]),a._v(" "),t("h2",{attrs:{id:"插件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#插件"}},[a._v("#")]),a._v(" 插件")]),a._v(" "),t("p",[a._v("与Loader用于转换特定类型的文件不同，插件可以贯穿webpack打包的生命周期，执行不同的任务。")]),a._v(" "),t("ol",[t("li",[a._v("html-webpack-plugin：将打包后的js、css自动引入到指定的html文件中")]),a._v(" "),t("li",[a._v("clean-webpack-plugin：自动清空打包目录")]),a._v(" "),t("li",[a._v("mini-css-extract-plugin：分离样式文件，将css以文件形式引入页面")]),a._v(" "),t("li",[a._v("optimize-css-assets-webpack-plugin: 压缩css")]),a._v(" "),t("li",[a._v("terser-webpack-plugin：压缩js")]),a._v(" "),t("li",[a._v("purgecss-webpack-plugin：会单独提取css并清除用不到的css")])]),a._v(" "),t("h2",{attrs:{id:"source-map"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#source-map"}},[a._v("#")]),a._v(" source-map")]),a._v(" "),t("p",[a._v("校验规则"),t("code",[a._v("^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$")])]),a._v(" "),t("ol",[t("li",[a._v("inline：代码通过dataUrl形式引入sourceMap")]),a._v(" "),t("li",[a._v("hidden：生成sourceMap文件，但不使用")]),a._v(" "),t("li",[a._v("eval："),t("code",[a._v("eval(...)")]),a._v("形式执行代码，通过dataUrl形式引入")]),a._v(" "),t("li",[a._v("nosources：不生成sourceMap")]),a._v(" "),t("li",[a._v("cheap：只需要定位到行信息，不需要列信息")]),a._v(" "),t("li",[a._v("module：展示源代码中的错误位置")])]),a._v(" "),t("p",[a._v("开发环境推荐配置："),t("code",[a._v("eval-cheap-module-source-map")])]),a._v(" "),t("ol",[t("li",[a._v("首次打包慢点，有"),t("code",[a._v("eval")]),a._v("缓存，rebuild会很快")]),a._v(" "),t("li",[a._v("只要能定位到行就行，所以加上cheap")]),a._v(" "),t("li",[a._v("希望找到源代码的错误，而不是打包后的，所以加上 "),t("code",[a._v("module")])])]),a._v(" "),t("p",[a._v("生产环境建议配置："),t("code",[a._v("none")]),a._v("，别人就无法看到源代码")]),a._v(" "),t("h2",{attrs:{id:"hash"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#hash"}},[a._v("#")]),a._v(" hash")]),a._v(" "),t("p",[a._v('打包后文件名字中的hash值，基础配置中用到的：`filename:"[name][hash:8][ext]"')]),a._v(" "),t("ol",[t("li",[a._v("hash：任何一个文件的改动，整个项目的构建hash值都会变")]),a._v(" "),t("li",[a._v("chunkhash：文件的改动只会影响其所在chunk的hash值，不同的entry会生出不同的chunkhash")]),a._v(" "),t("li",[a._v("contenthash：每个文件都有单独的hash值，文件的改动只会影响自身的hash值")])]),a._v(" "),t("h2",{attrs:{id:"babel"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#babel"}},[a._v("#")]),a._v(" babel")]),a._v(" "),t("h2",{attrs:{id:"优化配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#优化配置"}},[a._v("#")]),a._v(" 优化配置")]),a._v(" "),t("ol",[t("li",[a._v("alias\n"),t("ol",[t("li",[a._v("alias用于创建 import 或 require的别名，来简化模块引用")]),a._v(" "),t("li",[a._v("可以避免在多个不同层级的文件中，引入同一模块，需要修改文件路径")])])]),a._v(" "),t("li",[a._v("extensions\n"),t("ol",[t("li",[a._v("webpack默认配置，resolve:{extensions: ['.js','.json','wasm']}")]),a._v(" "),t("li",[a._v("允许引入模块时不带扩展名")]),a._v(" "),t("li",[a._v("注意：高频文件后缀名放前面。有个两个相同的文件 index.js 和 index.json 会优先选择index.js")])])]),a._v(" "),t("li",[a._v("modules\n"),t("ol",[t("li",[a._v("告诉webpack解析模块时应该搜索的目录")]),a._v(" "),t("li",[a._v("resolve:{modules: [resolve('src'),'node_modules']}")])])]),a._v(" "),t("li",[a._v("external\n"),t("ol",[t("li",[t("code",[a._v("external")]),a._v("配置选项提供了「从输出的bundle中排出依赖」的方法。")]),a._v(" "),t("li",[a._v("例如从cdn中引入某些第三方库，那么这些文件就不用打包到bundle中")]),a._v(" "),t("li",[a._v("剥离一些不需要改动的依赖，节省打包时间。")])])]),a._v(" "),t("li",[a._v("配置loader时，排出某些不需要解析的目录\n"),t("ol",[t("li",[a._v("include：符合条件的模块进行解析")]),a._v(" "),t("li",[a._v("exclude：排出符合条件的模块，不解析。优先级高于include")]),a._v(" "),t("li",[a._v("例如在babel-loader中只解析src中的js文件，排出node_modules中的依赖")])])]),a._v(" "),t("li",[a._v("babel-loader开启缓存\n"),t("ol",[t("li",[a._v("babel在转译js过程中开销较大，将babel-loader的执行结果缓存起来可以大大缩短编译速度")]),a._v(" "),t("li",[a._v("cache-loader：缓存一些开销较大的loader的处理结果，缓存位置：node_modules/.cache/cache-loader")])])])]),a._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[a._v("      "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[a._v("rules")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n            "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[a._v("test")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[a._v("\\.(s[ac]|c)ss$")]),t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token regex-flags"}},[a._v("i")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//匹配所有sass/scss/css文件")]),a._v("\n            "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[a._v("use")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n                MiniCssExtractPlugin"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("loader"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n                "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'cache-loader'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 获取前面loader转换的结果")]),a._v("\n                "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'css-loader'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n                "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'postcss-loader'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n                "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'sass-loader'")]),a._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br"),t("span",{staticClass:"line-number"},[a._v("12")]),t("br")])]),t("ol",{attrs:{start:"7"}},[t("li",[a._v("Tree-shaking：剔除无用代码，以降低包的体积")]),a._v(" "),t("li",[a._v("Scope Hoisting：作用于提升，原理是将多个模块放在同一个作用域下，并重命名防止命名冲突，通过这种方式可以减少函数声明和内存开销")]),a._v(" "),t("li",[a._v("提升首屏的加载速度：降低首屏加载文件的体积，首屏不需要的文件进行预加载或者按需加载")]),a._v(" "),t("li",[a._v("prefetch和preload：\n"),t("ol",[t("li",[a._v("prefetch：预获取，浏览器空闲的时候进行资源拉取")]),a._v(" "),t("li",[a._v("preload：预加载，提前加载后面会用到的关键资源，因为会提前加载，如果不是特殊需要，慎用")])])])]),a._v(" "),t("hr"),a._v(" "),t("h2",{attrs:{id:"webpack的构建流程是什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#webpack的构建流程是什么"}},[a._v("#")]),a._v(" webpack的构建流程是什么")]),a._v(" "),t("ol",[t("li",[t("code",[a._v("初始化参数")]),a._v("：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数，形成最后的配置结果。")]),a._v(" "),t("li",[t("code",[a._v("开始编译")]),a._v("：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的run方法开始执行编译。")]),a._v(" "),t("li",[t("code",[a._v("确定入口")]),a._v("：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去")]),a._v(" "),t("li",[t("code",[a._v("编译模块")]),a._v("：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过处理")]),a._v(" "),t("li",[t("code",[a._v("完成模块编译并输出")]),a._v("：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据entry或分包配置生成代码块chunk")]),a._v(" "),t("li",[t("code",[a._v("输出完成")]),a._v("：输出所有的chunk到文件系统。")])]),a._v(" "),t("h2",{attrs:{id:"webpack热更新的原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#webpack热更新的原理"}},[a._v("#")]),a._v(" webpack热更新的原理")]),a._v(" "),t("p",[a._v("当文件变化触发webpack进行编译并完成后，通过socket消息告诉浏览器准备刷新。为了减少刷新代价，只刷新变化文件打包后的模块，\nwebpack-dev-server可以支持热更新，通过生成文件的hash值来对比需要更新的模块，浏览器再进行热替换")]),a._v(" "),t("h2",{attrs:{id:"webpack插件如何实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#webpack插件如何实现"}},[a._v("#")]),a._v(" webpack插件如何实现")]),a._v(" "),t("ol",[t("li",[a._v("webpack本质是一个事件流机制，核心模块：tapable(Sync + Async)Hooks 构造输出 === compiler(编译) + compilation(创建bundles)")]),a._v(" "),t("li",[a._v("compiler对象代表了完整的webpack环境配置。这个对象在启动webpack时被一次性建立，并配置好所有可操作的配置，包括options、loader和plugin。当在webpack环境中应用一个插件时，插件将收到此compiler对象的引用。可以用它来访问webpack的主环境。")]),a._v(" "),t("li",[a._v("compilation对象代表了一次资源版本构建。当运行webpack开发环境中间件时，每当检测到一个文件变化，就会创建一个新的compilation，从而生成一个新的编译资源。一个compilation对象表现了当前的资源模块、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。")]),a._v(" "),t("li",[a._v("compilation对象也提供了很多关键时机的回调，以供插件做自定义时选择使用")]),a._v(" "),t("li",[a._v("创建一个插件函数，在其prototype上定义apply方法，制定一个webpack自身的事件钩子")]),a._v(" "),t("li",[a._v("函数内部处理webpack内部实例的特定数据")]),a._v(" "),t("li",[a._v("处理完成后，调用webpack提供的回调函数")])]),a._v(" "),t("h2",{attrs:{id:"如何使用webpack优化前端性能"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何使用webpack优化前端性能"}},[a._v("#")]),a._v(" 如何使用webpack优化前端性能")]),a._v(" "),t("p",[a._v("用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行速度高效。")]),a._v(" "),t("ol",[t("li",[a._v("压缩代码：删除多余的代码、注释、简化代码的写法等方式。")]),a._v(" "),t("li",[a._v("利用CDN加速：在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源路径")]),a._v(" "),t("li",[a._v("Tree-Shaking：将代码中永远不会走到的片段删掉。可以通过在启动webpack时追加参数 --optimize-minimize实现。")]),a._v(" "),t("li",[a._v("Code Splitting：将代码按路由维度或者组件分块(chunk)，这样做到按需加载，同时可以充分利用浏览器缓存")]),a._v(" "),t("li",[a._v("提取公共第三方库：SplitChunksPlugin插件来进行公共模块抽取，利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码")])])])}),[],!1,null,null,null);e.default=l.exports}}]);