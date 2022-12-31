(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{766:function(s,t,a){"use strict";a.r(t);var e=a(108),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"console-控制台"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-控制台"}},[s._v("#")]),s._v(" Console 控制台")]),s._v(" "),a("p",[s._v("Console 类所在命名空间："),a("code",[s._v("\\ZM\\Console\\Console")])]),s._v(" "),a("p",[s._v("Console 类为框架的终端输出管理类。")]),s._v(" "),a("h2",{attrs:{id:"设置-log-输出等级"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#设置-log-输出等级"}},[s._v("#")]),s._v(" 设置 Log 输出等级")]),s._v(" "),a("p",[a("strong",[s._v("输出等级")]),s._v(" 控制了输出到命令行的内容的重要性。在框架的输出中，消息有以下几种不同等级的类别")]),s._v(" "),a("ul",[a("li",[a("strong",[s._v("error")]),s._v(" / "),a("strong",[s._v("log")]),s._v(": 0")]),s._v(" "),a("li",[a("strong",[s._v("warning")]),s._v(": 1")]),s._v(" "),a("li",[a("strong",[s._v("info")]),s._v(" / "),a("strong",[s._v("success")]),s._v(": 2")]),s._v(" "),a("li",[a("strong",[s._v("verbose")]),s._v(": 3")]),s._v(" "),a("li",[a("strong",[s._v("debug")]),s._v(": 4")])]),s._v(" "),a("p",[s._v("输出等级设置后显示的消息类别为小于等于当前 log 的。假设你将 log 等级设置为 3，你可以看到除 debug 外的所有 log 内容。")]),s._v(" "),a("p",[s._v("通过配置文件 "),a("code",[s._v("global.php")]),s._v(" 中的 "),a("code",[s._v("init_atomics -> info_level")]),s._v(" 的数值你可以更改框架的默认 log 等级（默认为 2）。")]),s._v(" "),a("p",[s._v("你也可以在启动框架的命令行中添加参数来切换 log 等级：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("vendor/bin/start server --log-error "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 以 error 等级启动框架")]),s._v("\nvendor/bin/start server --log-warning "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 以 warning 等级启动框架")]),s._v("\nvendor/bin/start server --log-info "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 以 info 等级启动框架")]),s._v("\nvendor/bin/start server --log-verbose "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 以 verbose 等级启动框架")]),s._v("\nvendor/bin/start server --log-debug "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 以 debug 等级启动框架")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("h2",{attrs:{id:"使用-log-输出内容"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用-log-输出内容"}},[s._v("#")]),s._v(" 使用 Log 输出内容")]),s._v(" "),a("p",[s._v("作为模块开发者的你，你可以主动调用框架内的 Console 类输出信息到终端。")]),s._v(" "),a("h3",{attrs:{id:"console-log"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-log"}},[s._v("#")]),s._v(" Console::log()")]),s._v(" "),a("p",[s._v("输出 0 级别的普通 log。")]),s._v(" "),a("ul",[a("li",[s._v("参数："),a("code",[s._v("$msg, $color")]),s._v("，分别为内容和字体颜色。")])]),s._v(" "),a("blockquote",[a("p",[s._v("此 log 不会被 info_level 所限制，无论如何也会输出到终端。")])]),s._v(" "),a("h3",{attrs:{id:"console-error"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-error"}},[s._v("#")]),s._v(" Console::error()")]),s._v(" "),a("p",[s._v("输出 error 级别的红色醒目 log。一般此 log 为框架内部出现不可忍受的错误，比如内存不足、PHP fatal error 等错误。")]),s._v(" "),a("ul",[a("li",[s._v("参数："),a("code",[s._v("$msg")])])]),s._v(" "),a("blockquote",[a("p",[s._v("此 log 不会被 info_level 所限制，无论如何也会输出到终端。")])]),s._v(" "),a("h3",{attrs:{id:"console-warning"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-warning"}},[s._v("#")]),s._v(" Console::warning()")]),s._v(" "),a("p",[s._v("输出 warning 级别的 log。")]),s._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[s._v("注意")]),s._v(" "),a("p",[s._v("框架内出现的用户态异常，比如无法发送 API、无法连接数据库等错误，都是 warning 错误，不会导致框架崩溃或功能错误的异常情况建议都使用 warning 输出而不是 error。")])]),s._v(" "),a("h3",{attrs:{id:"console-info"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-info"}},[s._v("#")]),s._v(" Console::info()")]),s._v(" "),a("p",[s._v("输出 info 级别的 log。")]),s._v(" "),a("h3",{attrs:{id:"console-success"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-success"}},[s._v("#")]),s._v(" Console::success()")]),s._v(" "),a("p",[s._v("输出 success 级别的log。")]),s._v(" "),a("h3",{attrs:{id:"console-verbose"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-verbose"}},[s._v("#")]),s._v(" Console::verbose()")]),s._v(" "),a("p",[s._v("输出 verbose 级别的 log。")]),s._v(" "),a("h3",{attrs:{id:"console-debug"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-debug"}},[s._v("#")]),s._v(" Console::debug()")]),s._v(" "),a("p",[s._v("输出 debug 级别的 log。")]),s._v(" "),a("h3",{attrs:{id:"console-stacktrace"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-stacktrace"}},[s._v("#")]),s._v(" Console::stackTrace()")]),s._v(" "),a("p",[s._v("输出栈追踪信息。")]),s._v(" "),a("h3",{attrs:{id:"console-setcolor"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-setcolor"}},[s._v("#")]),s._v(" Console::setColor()")]),s._v(" "),a("p",[s._v("返回：彩色的字符串。")]),s._v(" "),a("ul",[a("li",[a("strong",[s._v("string")]),s._v(": 要变颜色的字符串")]),s._v(" "),a("li",[a("strong",[s._v("color")]),s._v(": 要变的颜色。支持 "),a("code",[s._v("red")]),s._v("，"),a("code",[s._v("green")]),s._v("，"),a("code",[s._v("yellow")]),s._v("，"),a("code",[s._v("reset")]),s._v("，"),a("code",[s._v("blue")]),s._v("，"),a("code",[s._v("gray")]),s._v("，"),a("code",[s._v("gold")]),s._v("，"),a("code",[s._v("pink")]),s._v("，"),a("code",[s._v("lightblue")]),s._v("，"),a("code",[s._v("lightlightblue")])])]),s._v(" "),a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("Console")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"This is normal msg. (0)"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("Console")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("error")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"This is error msg. (0)"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("Console")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("warning")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"This is warning msg. (1)"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("Console")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("info")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"This is info msg. (2)"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("Console")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("success")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"This is success msg. (2)"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("Console")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("verbose")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"This is verbose msg. (3)"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("Console")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("debug")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"This is debug msg. (4)"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("Console")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("stackTrace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$str")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name static-context"}},[s._v("Console")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("::")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setColor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"I am gold color."')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string double-quoted-string"}},[s._v('"gold"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("h2",{attrs:{id:"终端交互命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#终端交互命令"}},[s._v("#")]),s._v(" 终端交互命令")]),s._v(" "),a("p",[s._v("炸毛框架支持从终端输入命令来进行一些操作，例如重启框架、停止框架、执行函数等。")]),s._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[s._v("注意")]),s._v(" "),a("p",[s._v("在 Docker、systemd、daemon 状态下启动的框架会自动关闭终端等待输入，交互不可用。")])]),s._v(" "),a("h3",{attrs:{id:"reload"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reload"}},[s._v("#")]),s._v(" reload")]),s._v(" "),a("p",[s._v("重新加载除 "),a("code",[s._v("src/Framework/")]),s._v(" 下的所有模块。")]),s._v(" "),a("ul",[a("li",[s._v("别名："),a("code",[s._v("r")])])]),s._v(" "),a("h3",{attrs:{id:"stop"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stop"}},[s._v("#")]),s._v(" stop")]),s._v(" "),a("p",[s._v("停止框架。")]),s._v(" "),a("h3",{attrs:{id:"logtest"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#logtest"}},[s._v("#")]),s._v(" logtest")]),s._v(" "),a("p",[s._v("输出各种等级的 log 示例文本。")]),s._v(" "),a("h3",{attrs:{id:"call"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#call"}},[s._v("#")]),s._v(" call")]),s._v(" "),a("p",[s._v("执行对应类的成员方法。下面是例子：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("call "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("ZM"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("Utils"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("ZMUtil reload\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"bc"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bc"}},[s._v("#")]),s._v(" bc")]),s._v(" "),a("p",[s._v("直接执行 PHP 代码，输入格式为 base64。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bc")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("XEZyYW1ld29ya1xDb25zb2xlOjp3YXJuaW5nKCJoZWxsbyB3YXJuaW5nISIpOw")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('# 代码内容：\\ZM\\Console\\Console::warning("hello warning!");')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 终端输出：[19:14:32] [W] hello warning!")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"echo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#echo"}},[s._v("#")]),s._v(" echo")]),s._v(" "),a("p",[s._v("输出文本")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" hello\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"color"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#color"}},[s._v("#")]),s._v(" color")]),s._v(" "),a("p",[s._v("按照颜色输出文本")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("color green 我是绿色的字\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"motd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#motd"}},[s._v("#")]),s._v(" MOTD")]),s._v(" "),a("p",[s._v("在 1.4 版本开始，框架支持启动时的 motd 内容修改。")]),s._v(" "),a("p",[s._v("文件位置："),a("code",[s._v("config/motd.txt")])]),s._v(" "),a("p",[s._v("其中，默认的 "),a("code",[s._v("Zhamao")]),s._v(" 字样的 MOTD 是使用 "),a("strong",[s._v("figlet")]),s._v(" 命令生成的，"),a("code",[s._v('figlet "Zhamao"')]),s._v("，你也可以针对自己的机器人名称或品牌进行生成。")]),s._v(" "),a("h2",{attrs:{id:"设置输出主题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#设置输出主题"}},[s._v("#")]),s._v(" 设置输出主题")]),s._v(" "),a("p",[s._v("Console 组件支持为多种不同的终端设置不同的主题，比如有些人喜欢使用白色的终端，但是白色终端下 info 的颜色很浅，看不到，还有人使用不能显示颜色的黑白终端.....")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("vendor/bin/start server --log-theme"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("主题名"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("现有支持的主题有："),a("code",[s._v("default")]),s._v("，"),a("code",[s._v("white-term")]),s._v("，"),a("code",[s._v("no-color")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("vendor/bin/start server --log-theme"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("white-term "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果用的是白色终端，这个主题更友好")]),s._v("\nvendor/bin/start server --log-theme"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("no-color   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果不想让 log 带有任何颜色，使用无色主题")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])])}),[],!1,null,null,null);t.default=n.exports}}]);