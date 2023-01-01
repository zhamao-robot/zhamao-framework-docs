(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{760:function(t,s,a){"use strict";a.r(s);var n=a(108),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"接入安全验证-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#接入安全验证-token"}},[t._v("#")]),t._v(" 接入安全验证 - Token")]),t._v(" "),a("p",[t._v("为了保障安全，框架支持给接入的 WebSocket 连接验证 Token，如果不设置 Token 同时又将框架的端口暴露在公网将会非常危险。")]),t._v(" "),a("p",[t._v("炸毛框架兼容 OneBot 标准的机器人客户端，所以自带一个 Token 验证器。")]),t._v(" "),a("p",[t._v("关于 Access Token 方面的标准规范，请参考下面内容：")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/howmanybots/onebot/blob/master/v11/specs/communication/authorization.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("OneBot - 鉴权"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/Mrs4s/go-cqhttp/blob/master/docs/config.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("go-cqhttp - 配置"),a("OutboundLink")],1)])]),t._v(" "),a("blockquote",[a("p",[t._v("以 go-cqhttp 举例，如果要设置验证，则将 go-cqhttp 配置文件中的 "),a("code",[t._v("access_token")]),t._v(" 项填入内容即可。")])]),t._v(" "),a("h2",{attrs:{id:"验证位置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#验证位置"}},[t._v("#")]),t._v(" 验证位置")]),t._v(" "),a("p",[t._v("框架对 Token 的验证是内置的，在事件 "),a("code",[t._v("open")]),t._v("（WebSocket 连接接入时）触发。")]),t._v(" "),a("p",[t._v("如果是兼容 OneBot 标准的客户端接入，则一切都是兼容的。")]),t._v(" "),a("p",[t._v("如果是自定义的其他 WebSocket 客户端也想接入框架，那么其他 WebSocket 客户端也需要进行相应的设置才能利用此 Token 验证。")]),t._v(" "),a("p",[t._v("如果验证成功（Token 符合要求）则分发事件 "),a("code",[t._v("@OnOpenEvent")]),t._v("，否则此事件不触发，同时断开 WebSocket 连接。")]),t._v(" "),a("h2",{attrs:{id:"标准验证-字符串形式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#标准验证-字符串形式"}},[t._v("#")]),t._v(" 标准验证（字符串形式）")]),t._v(" "),a("p",[t._v("默认的情况下，在框架的全局配置文件 "),a("code",[t._v("global.php")]),t._v(" 中，对配置项 "),a("code",[t._v("access_token")]),t._v(" 填入与 OneBot 客户端相同的 "),a("code",[t._v("access_token")]),t._v(" 即可实现鉴权。下面是一个最基本的和 go-cqhttp 设置鉴权配置：")]),t._v(" "),a("p",[t._v("go-cqhttp 的配置段：")]),t._v(" "),a("div",{staticClass:"language-hjson line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('  // 访问密钥, 强烈推荐在公网的服务器设置\n  access_token: "emhhbWFvLXJvYm90"\n')])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("框架的配置文件配置段：")]),t._v(" "),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/** onebot连接约定的token */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$config")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[t._v('"access_token"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string single-quoted-string"}},[t._v("'emhhbWFvLXJvYm90'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("然后重启框架和 go-cqhttp 即可。（其他 OneBot 客户端同理）")]),t._v(" "),a("h2",{attrs:{id:"自定义验证-token-验证"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自定义验证-token-验证"}},[t._v("#")]),t._v(" 自定义验证（Token 验证）")]),t._v(" "),a("p",[t._v("有些情况下，使用一个单一的字符串可能无法满足你对 Token 验证的安全需求，需要自定义一些判断模式才能满足，所以框架的 "),a("code",[t._v("access_token")]),t._v(" 配置项支持动态的闭包函数自行编写判断逻辑，例如下面的一个例子，我可以让框架同时允许接入多个不同 token 的 WebSocket 连接：")]),t._v(" "),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/** onebot连接约定的token */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$config")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[t._v('"access_token"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$token")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$allow")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string single-quoted-string"}},[t._v("'emhhbWFvLXJvYm90'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string single-quoted-string"}},[t._v("'aXMtdmVyeS1nb29k'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("in_array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$token")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$allow")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("h2",{attrs:{id:"自定义验证-open-事件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自定义验证-open-事件"}},[t._v("#")]),t._v(" 自定义验证（open 事件）")]),t._v(" "),a("p",[t._v("当然，这里设置了自定义方式，其实你也可以在下一层的 "),a("code",[t._v("@OnOpenEvent")]),t._v(" 注解事件中进行自定义内容和判断，具体见 "),a("code",[t._v("@OnOpenEvent")]),t._v(" 的相关章节。")])])}),[],!1,null,null,null);s.default=e.exports}}]);