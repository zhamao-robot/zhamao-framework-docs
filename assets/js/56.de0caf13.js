(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{798:function(e,r,t){"use strict";t.r(r);var a=t(108),s=Object(a.a)({},(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"出现-deadlock-字样"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#出现-deadlock-字样"}},[e._v("#")]),e._v(" 出现 deadlock 字样")]),e._v(" "),t("p",[e._v("一般情况下，如果误操作框架可能会报如下图的错误：")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("===================================================================\n [FATAL ERROR]: all coroutines (count: 1) are asleep - deadlock!\n===================================================================\n\n [Coroutine-1]\n--------------------------------------------------------------------\n#0  Swoole\\Coroutine\\System::sleep() called at [/Users/jerry/project/git-project/zhamao-framework/src/ZM/global_functions.php:232]\n#1  zm_sleep() called at [/Users/jerry/project/git-project/zhamao-framework/src/Module/Example/Hello.php:38]\n#2  Module\\Example\\Hello->onStart() called at [/Users/jerry/project/git-project/zhamao-framework/src/ZM/Event/EventDispatcher.php:205]\n#3  ZM\\Event\\EventDispatcher->dispatchEvent() called at [/Users/jerry/project/git-project/zhamao-framework/src/ZM/Event/EventDispatcher.php:89]\n#4  ZM\\Event\\EventDispatcher->dispatchEvents() called at [/Users/jerry/project/git-project/zhamao-framework/src/ZM/Event/SwooleEvent/OnWorkerStart.php:130]\n#5  ZM\\Event\\SwooleEvent\\OnWorkerStart->onCall() called at [/Users/jerry/project/git-project/zhamao-framework/src/ZM/Framework.php:336]\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br"),t("span",{staticClass:"line-number"},[e._v("9")]),t("br"),t("span",{staticClass:"line-number"},[e._v("10")]),t("br"),t("span",{staticClass:"line-number"},[e._v("11")]),t("br"),t("span",{staticClass:"line-number"},[e._v("12")]),t("br")])]),t("p",[e._v("这种错误的出现原因一般是因为协程未结束而 Worker 进程提前退出导致的，这个错误也可手动造成（在任意 Worker 进程内的位置使用 "),t("code",[e._v("zm_yield()")]),e._v(" 且不使用 "),t("code",[e._v("zm_resume()")]),e._v(" 恢复，期间使用 reload 或 stop 重启或停止框架就会报错）。")]),e._v(" "),t("p",[e._v("还有一种情况是数据库、文件读取或下载上传还没有传送结束，时间已经超时，在关闭或重启框架时不得不强行切断协程的运行。这种情况建议根据下方的打印输出栈进行插错，建议将协程运行时间长的过程缩短或调长 "),t("code",[e._v("swoole")]),e._v(" 配置项下面的 "),t("code",[e._v("max_wait_time")]),e._v(" 时间（秒），2.4.3 版本起此参数默认为 5 秒。")])])}),[],!1,null,null,null);r.default=s.exports}}]);