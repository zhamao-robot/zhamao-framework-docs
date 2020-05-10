---
sidebarDepth: 2
---
# WebSocket 服务器

炸毛框架不仅仅完全支持 HTTP 的各类服务扩展，还支持 WebSocket 各类服务的扩展。

::: warning 注意
为了减少篇幅和便于阅读，下文中的 **WS** 均指 WebSocket。
:::

## 连接对象
炸毛框架对连接到端口的 WS 连接进行了一系列管理。首先为了分类和辨别链接类型，框架会约定以下规则，请在开发其他 WS 客户端连接炸毛框架时遵守：

1. 在握手时，GET参数中的 `type` 参数或 Header 中的 `X-Client-Rule` 作为判断连接类型的依据，必须指定其中之一。
2. 关于不同种类的连接鉴权问题，框架不提供解决方案，可通过监听 `@SwooleEventAt("open")` 事件进行编写自己的鉴权规则。
3. 如果未指定 `type` 或类型在框架中未声明，则一律归为 `unknown` 类型，对应类 `UnknownConnection`。

> 在框架默认自带的示例模块类 **Hello** 中包含了对 `unknown` 类型链接的自动断开函数。如果不需要或进行判定可自行扩展和修改。

以下所有连接对象的命名空间均为 `ZM\Connection\xxxConnection` 或自定义的 `Custom\Connection\xxxConnection`

### 基类 WSConnection
在框架的定义中，所有的链接对象都将实例化为基于 WSConnection 类的对象，比如上面提到的 `unknown` 类型对应实例化为 `UnknownConnection`。
基类提供以下函数供操作：
- `exists()`：判断此链接是否还存在
- `close()`：关闭此链接，并自动销毁此对象。后续不可对本对象操作
- `push($data, $error_record = true)`：给此链接的客户端推送消息，data 为内容，第二个参数为 `false` 时不写入日志。推送成功时返回 `true`，失败时为 `false`
- `getType()`：获取此对象类型的字符串名称，是抽象方法。

### CQConnection
框架支持 CQHTTP 插件请求过来的反向 WS 链接，在框架内定义的类型是 `qq`，对应类为 `CQConnection`。

此连接类型对象提供以下函数：
- `getQQ()`：获取此链接对应机器人的 QQ 号码

### 连接对象使用示例
下面是一个调用 CQConnection 的示例，我们从对象里获取当前机器人的 QQ 号码：
```php
<?php
namespace Module\Example;

class Hello {
    /**
     * @CQCommand("机器人QQ")
     */
    public function status(){
        $r = ctx()->getConnection();
        return "当前机器人QQ：".$r->getQQ();
    }
}
```


## 自定义连接
当然默认框架只支持了 `qq` 一种连接类型，为了扩展性，你可以在 `src/Custom/Connection/` 下编写自己的链接类型。
```php
<?php
namespace Custom\Connection;

use ZM\Connection\WSConnection;

class CustomConnection extends WSConnection
{
    public function getType() {
        return "custom";
    }
}
```