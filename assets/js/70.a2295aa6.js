(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{811:function(s,a,e){"use strict";e.r(a);var t=e(108),n=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"编写模块"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#编写模块"}},[s._v("#")]),s._v(" 编写模块")]),s._v(" "),e("p",[s._v("到现在为止，我们还在使用框架的默认模块 "),e("code",[s._v("Example/Hello.php")]),s._v("，在开始编写自己的模块应用之前，我们先说明一些编写代码的约定。")]),s._v(" "),e("h2",{attrs:{id:"加载模块"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#加载模块"}},[s._v("#")]),s._v(" 加载模块")]),s._v(" "),e("p",[s._v("框架默认使用脚手架构建好后，目录结构大致为下面这样：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("zhamao-framework-starter/\n├── config/                 # 项目的配置文件文件夹，如 global.php\n├── src/                    # 项目的主要源码目录\n│   ├── Module/             # 用户编写的模块目录\n│   │   └── Example/        # 模块文件夹名称\n│   │       └── Hello.php   # 模块内的类\n│   └── Custom/             # 用户自定义的全局方法、全局注解类等存放的目录\n├── vendor/                 # Composer 依赖加载目录\n└── composer.json           # Composer 配置文件\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br")])]),e("p",[s._v("其中我们脚手架包含的默认模块 "),e("code",[s._v("Example")]),s._v(" 下的 "),e("code",[s._v("Hello")]),s._v(" 类，就是用户写模块的位置。你也可以根据实际情况，自行添加更多的模块文件夹甚至单文件模块。")]),s._v(" "),e("p",[s._v("需要注意的是，所有文件夹名称和 "),e("code",[s._v(".php")]),s._v(" 文件必须遵循 "),e("a",{attrs:{href:"https://learnku.com/docs/psr/psr-4-autoloader/1608",target:"_blank",rel:"noopener noreferrer"}},[s._v("psr-4 规范"),e("OutboundLink")],1),s._v("，简单来说，"),e("code",[s._v("src/")]),s._v(" 目录下的文件夹，子文件夹要写成命名空间，比如默认框架中 "),e("code",[s._v("Example/")]),s._v(" 下的 "),e("code",[s._v(".php")]),s._v(" 文件的命名空间为 "),e("code",[s._v("namespace Module\\Example;")]),s._v("，且一个 "),e("code",[s._v(".php")]),s._v(" 文件推荐只包含一个 "),e("code",[s._v("class")]),s._v("、"),e("code",[s._v("trait")]),s._v(" 或 "),e("code",[s._v("interface")]),s._v("。")]),s._v(" "),e("div",{staticClass:"language-php line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-php"}},[e("code",[e("span",{pre:!0,attrs:{class:"token php language-php"}},[e("span",{pre:!0,attrs:{class:"token delimiter important"}},[s._v("<?php")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("namespace")]),s._v(" Module\\"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("your"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("module"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("dir"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name-definition class-name"}},[s._v("ModuleA")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("div",{staticClass:"custom-block danger"},[e("p",{staticClass:"custom-block-title"},[s._v("警告")]),s._v(" "),e("p",[s._v("如果没有遵守上方的类和文件命名规则的话（文件名、文件夹名和命名空间的统一性），在加载框架时就会报错，无法找到对应的类。因为框架的注解解析依赖于 Composer 中 psr-4 规则的自动加载。")])]),s._v(" "),e("h2",{attrs:{id:"创建模块"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建模块"}},[s._v("#")]),s._v(" 创建模块")]),s._v(" "),e("h3",{attrs:{id:"标准形式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#标准形式"}},[s._v("#")]),s._v(" 标准形式")]),s._v(" "),e("p",[s._v("我们这里以 "),e("code",[s._v("Entertain")]),s._v(" 娱乐模块的创建为例，新建一个内有 "),e("code",[s._v("Dice.php")]),s._v(" 掷骰子功能的模块，目录结构如下，在 "),e("code",[s._v("Module/")]),s._v(" 下新建文件夹 "),e("code",[s._v("Entertain/")]),s._v("，再在此子目录下新建 "),e("code",[s._v("Dice.php")]),s._v(" 文件。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("zhamao-framework-starter/\n└── src/\n    └── Module/\n        └── Entertain/\n            └── Dice.php\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("p",[s._v("新建的 PHP 文件按照如下方式编写：")]),s._v(" "),e("div",{staticClass:"language-php line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-php"}},[e("code",[e("span",{pre:!0,attrs:{class:"token php language-php"}},[e("span",{pre:!0,attrs:{class:"token delimiter important"}},[s._v("<?php")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("namespace")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token package"}},[s._v("Module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("Entertain")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name-definition class-name"}},[s._v("Dice")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("p",[s._v("这个时候它已经可以被称为一个模块了，尽管它还什么都没做。")]),s._v(" "),e("h3",{attrs:{id:"单文件形式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#单文件形式"}},[s._v("#")]),s._v(" 单文件形式")]),s._v(" "),e("p",[s._v("如果你只开发很简单的一些功能，如一个 PHP 文件就可以实现的，可以少去创建模块文件夹的一步，直接将 "),e("code",[s._v(".php")]),s._v(" 文件新建到 "),e("code",[s._v("Module/")]),s._v(" 文件夹下，这时此文件的命名空间需要更正为 "),e("code",[s._v("namespace Module;")]),s._v(" 即可，而文件夹结构也更加简单：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("zhamao-framework-starter/\n└── src/\n    └── Module/\n        └── Dice.php\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("h3",{attrs:{id:"composer-外部引入形式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#composer-外部引入形式"}},[s._v("#")]),s._v(" Composer 外部引入形式")]),s._v(" "),e("p",[s._v("（暂未支持，敬请期待，TODO：已经支持了，但缺少文档编写）")])])}),[],!1,null,null,null);a.default=n.exports}}]);