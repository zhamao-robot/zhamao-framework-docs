(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{795:function(s,t,a){"use strict";a.r(t);var n=a(108),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"启动时报错-address-already-in-use"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动时报错-address-already-in-use"}},[s._v("#")]),s._v(" 启动时报错 Address already in use")]),s._v(" "),a("ol",[a("li",[s._v("检查是否开启了两次框架，每个端口只能开启一个框架。")]),s._v(" "),a("li",[s._v("如果是之前已经在 20001 端口或者你设置了别的应用同样占用此端口，更换配置文件 "),a("code",[s._v("global.php")]),s._v(" 中的 port 即可。")]),s._v(" "),a("li",[s._v("如果是之前框架成功启动，但是使用 Ctrl+C 停止后再次启动导致的报错，请根据下面的步骤来检查是否存在僵尸进程。")])]),s._v(" "),a("ul",[a("li",[s._v("如果系统内装有 "),a("code",[s._v("htop")]),s._v("，可以直接在 "),a("code",[s._v("htop")]),s._v(" 中开启 Tree 模式并使用 filter 过滤 php，检查残留的框架进程。")]),s._v(" "),a("li",[s._v("如果系统没有 "),a("code",[s._v("htop")]),s._v("，使用 "),a("code",[s._v("ps aux | grep vendor/bin/start | grep -v grep")]),s._v(" 如果存在进程，请使用以下命令尝试杀掉：")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果确定框架的数据都已保存且没有需要保存的缓存数据，直接杀掉 SIGKILL 即可，输入下面这条")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" aux "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" vendor/bin/start "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" -v "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print $2}'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("kill")]),s._v(" -9\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果不确定框架是不是还继续运行，想尝试正常关闭（走一遍储存保存数据的事件），使用下面这条")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 首先使用 'ps aux | grep vendor/bin/start | grep -v grep' 找到进程中第二列最小的pid")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 然后使用下面的这条命令，假设最小的pid是23643")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("kill")]),s._v(" -INT "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("23643")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果使用 ps aux 看不到框架相关进程，证明关闭成功，否则需要使用第一条强行杀死")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);