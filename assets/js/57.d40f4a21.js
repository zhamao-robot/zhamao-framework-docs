(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{797:function(e,t,a){"use strict";a.r(t);var s=a(108),c=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"使用-lightcache-关闭时无法正常保存持久化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用-lightcache-关闭时无法正常保存持久化"}},[e._v("#")]),e._v(" 使用 LightCache 关闭时无法正常保存持久化")]),e._v(" "),a("p",[e._v("LightCache 因为是跨内存使用的，所以每次重启和关闭框架时，都只会让其中一个进程去保存。因为在 2.4.2 版本开始，持久化的逻辑发生了更改，不再支持 "),a("code",[e._v("expire = -2")]),e._v(" 进行设置持久化（因为那样会很容易让开发者写错），仅支持使用 "),a("code",[e._v("LightCache::addPersistence($key)")]),e._v(" 这样的方式进行设置持久化，所以在 2.4.2 版本以后，请使用此方法进行持久化设置，保证数据不丢失。")]),e._v(" "),a("p",[e._v("此外，2.4.2 版本起，不再支持用户手动调用 "),a("code",[e._v("savePersistence()")]),e._v(" 方法，普通用户不可手动调用此方法，否则会导致数据出错。")])])}),[],!1,null,null,null);t.default=c.exports}}]);