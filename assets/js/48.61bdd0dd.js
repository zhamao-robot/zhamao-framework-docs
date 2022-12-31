(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{789:function(s,t,a){"use strict";a.r(t);var n=a(108),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"事件分发器-进阶"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件分发器-进阶"}},[s._v("#")]),s._v(" 事件分发器（进阶）")]),s._v(" "),a("p",[s._v("事件分发器是以上所有注解事件执行函数的一个分发器，如果你在上一章已经学会了如何创建自定义注解，那么本章就来说明如何用内置的事件分发器进行分发自定义事件。")]),s._v(" "),a("p",[s._v("如果你不需要了解或自定义有关事件分发的功能，此处可无需阅读。")]),s._v(" "),a("h2",{attrs:{id:"属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#属性"}},[s._v("#")]),s._v(" 属性")]),s._v(" "),a("ul",[a("li",[s._v("类名："),a("code",[s._v("ZM\\Event\\EventDispatcher")])])]),s._v(" "),a("h2",{attrs:{id:"方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[s._v("#")]),s._v(" 方法")]),s._v(" "),a("h3",{attrs:{id:"eventdispatcher-interrupt"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#eventdispatcher-interrupt"}},[s._v("#")]),s._v(" EventDispatcher::interrupt()")]),s._v(" "),a("p",[s._v("阻断当前正在运行的事件，只能在事件内部被调用的函数中实现。")]),s._v(" "),a("h3",{attrs:{id:"construct"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#construct"}},[s._v("#")]),s._v(" __construct()")]),s._v(" "),a("p",[s._v("构造方法。")]),s._v(" "),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("EventDispatcher")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("__construct")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword type-hint"}},[s._v("string")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string single-quoted-string"}},[s._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("初始化一个事件分发器，可进行一系列设置，对事件分发做限定。")]),s._v(" "),a("h4",{attrs:{id:"参数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参数"}},[s._v("#")]),s._v(" 参数")]),s._v(" "),a("p",[a("code",[s._v("$class")]),s._v("：设置要分发的事件对应的注解类名，支持自定义注解（例如 "),a("code",[s._v("CQMessage::class")]),s._v("）")]),s._v(" "),a("h3",{attrs:{id:"setrulefunction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setrulefunction"}},[s._v("#")]),s._v(" setRuleFunction()")]),s._v(" "),a("p",[s._v("设置函数触发规则判定的函数（就是在执行事件函数前执行的规则判定）")]),s._v(" "),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setRuleFunction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword type-hint"}},[s._v("callable")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$rule")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"参数-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参数-2"}},[s._v("#")]),s._v(" 参数")]),s._v(" "),a("p",[a("code",[s._v("$rule")]),s._v("：支持回调或闭包。闭包的参数为执行对应事件函数所绑定的注解事件对象。")]),s._v(" "),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$dispatcher")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("EventDispatcher")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("CustomEvent")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$dispatcher")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("->")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setRuleFunction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$obj")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$obj")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("->")]),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("name")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"zhamao"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant boolean"}},[s._v("true")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("上方的 "),a("code",[s._v("$obj")]),s._v(" 就是 CustomEvent 类的实例，参数绑定为注解中对应的参数。")]),s._v(" "),a("h3",{attrs:{id:"setresultfunction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setresultfunction"}},[s._v("#")]),s._v(" setResultFunction()")]),s._v(" "),a("p",[s._v("设置事件函数返回值处理的回调函数。")]),s._v(" "),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setReturnFunction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword type-hint"}},[s._v("callable")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$return_func")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"参数-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参数-3"}},[s._v("#")]),s._v(" 参数")]),s._v(" "),a("p",[a("code",[s._v("$return_func")]),s._v("：设置事件函数返回值处理的回调函数，回调参数绑定为对应单独事件函数的返回值。")]),s._v(" "),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$dispatcher")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("EventDispatcher")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("CustomEvent")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$dispatcher")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("->")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setReturnFunction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("is_string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("Console")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("info")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"函数返回了 "')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h3",{attrs:{id:"dispatchevents"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dispatchevents"}},[s._v("#")]),s._v(" dispatchEvents()")]),s._v(" "),a("p",[s._v("开始分发事件。")]),s._v(" "),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dispatchEvents")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$params")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"参数-4"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参数-4"}},[s._v("#")]),s._v(" 参数")]),s._v(" "),a("p",[s._v("自定义参数，这里填入的参数将被填入被分发的函数参数中。")]),s._v(" "),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$dispatcher")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("->")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dispatchEvents")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"foo"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"bar"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token php language-php"}},[a("span",{pre:!0,attrs:{class:"token delimiter important"}},[s._v("<?php")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name-definition class-name"}},[s._v("Test")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('/**\n     * @CustomEvent("zhamao")\n     */')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-definition function"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$arg1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$arg2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"'),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$arg1")])]),s._v(": "),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$arg2")])]),s._v('"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('//将输出 "foo: bar"')]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("h2",{attrs:{id:"机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#机制"}},[s._v("#")]),s._v(" 机制")]),s._v(" "),a("p",[s._v("事件分发器的机制说简单不简单，说复杂也不复杂，它和中间件有着非常大的关系，因为它会自动检测和识别所要执行的函数有没有中间件，并且根据顺序进行执行。")]),s._v(" "),a("p",[s._v("在炸毛框架内部，一个完整的事件流程和中间件的关系如下图：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://static.zhamao.me/images/docs/dbb4e32e1c77f96162d10e41f25befa4.png",alt:"Untitled Diagram"}})]),s._v(" "),a("p",[s._v("对于同一事件的优先级和响应顺序，优先级的关系如下图：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://static.zhamao.me/images/docs/fa52005b7ca891053617a77541c7e785.png",alt:"diagram"}})]),s._v(" "),a("p",[s._v("对于事件内单个事件被调用的单个函数下如果存在多个中间件，中间件模型和事件的关系如下图：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://static.zhamao.me/images/docs/16ce39caad472d03d7786e6ffb0c55bf.png",alt:"Untitled Diagram-2"}})]),s._v(" "),a("h2",{attrs:{id:"实战例子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实战例子"}},[s._v("#")]),s._v(" 实战例子")]),s._v(" "),a("p",[s._v("我们假设 CustomEvent 是我们的自定义注解。还没写完，这部分太复杂了，而且举例子也不好举例，这块应该也不用着急更新。")]),s._v(" "),a("p",[s._v("TODO：待完成")])])}),[],!1,null,null,null);t.default=e.exports}}]);