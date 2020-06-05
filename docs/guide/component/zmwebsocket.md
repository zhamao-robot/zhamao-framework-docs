---
sidebarDepth: 3
---

# ZMWebSocket 客户端

这个是 ZMRequest 扩展而来的异步 WebSocket 客户端，可供方便地连接、收发 WebSocket 消息所定制。

## 基础用法

因为 Swoole 提供的是同步协程的方案，但对于 WebSocket 这样的全双工通信，反而不是一个好的代码逻辑，炸毛框架将此同步协程的方案封装成了异步事件调用的方式。

你可以从 `ZMRequest::websocket()` 获取对象，也可以自行构造一个对象。

命名空间：`\ZM\Utils\ZMWebSocket` 

```php
$ws = ZMRequest::websocket("ws://127.0.0.1:12345/"); //使用工具函数
// $ws = new ZMWebSocket("ws://127.0.0.1:12345/"); //直接构造
if($ws->is_available) {
  $ws->onMessage(function(\Swoole\WebSocket\Frame $frame, $client) {
    var_dump($frame->data);
  });
  $ws->onClose(function($client){
    Console::info("Websocket closed.");
  });
  $result = $ws->upgrade();
  var_dump($result);
}
```

## 属性

### is_available

`bool` 类型，用于判断构造对象是否成功或链接是否可用。在构建新的对象并执行 `upgrade()` 前，如果 ws 链接没有问题，则会变为 true；在 `onClose()` 回调执行后，此值变回 false。

## 方法

### __construct()

客户端对象的构造方法。

参数：

- `$url`：要请求到的 WebSocket 目标地址，必须以 `ws(s)://` 开头
- `$set`：可选，Swoole 客户端的参数，例如超时、是否使用 `websocket_mask` 等，如果为空数组则默认为 `["websocket_mask" => true]`，具体可设置的内容见 [Swoole 文档](https://wiki.swoole.com/#/coroutine_client/http_client?id=set)
- `$header`：可选，请求的头部信息，数组

```php
$a = new ZMWebSocket("ws://127.0.0.1:8080/", ["websocket_mask" => true], [
  "User-Agent" => "Firefox"
]);
```

### onMessage()

设置收到消息的回调函数。

回调的参数：

- `$frame`：`Swoole\WebSocket\Frame` 类型，消息帧，一般只用 `$frame->data` 获取数据，具体见 [Swoole 文档](https://wiki.swoole.com/#/websocket_server?id=swoolewebsocketframe)
- `$client`：`Swoole\Coroutine\Http\Client` 类型，为客户端本身的对象，用于 push 数据等

```php
$a->onMessage(function($frame, $client){
  echo "收到消息：".$frame->data.PHP_EOL;
  $client->push("hello world");
});
```

### onClose()

设置连接断开后执行的回调函数。

回调的参数：

- `$client`：同上，但断开连接后不能使用 `push()` 发送数据了，只建议作为重连等机制的使用

```php
$a->onClose(function($client){
  echo "WS 链接断开了！".PHP_EOL;
});
```

### upgrade()

发起连接。

返回值：`true|false`，当为 `true` 时代表握手成功，此时可以在回调里愉快地收发消息了。如果为 `false` 表明握手失败。

::: warning 注意

这里由于是协程转异步，所以不能确定 `upgrade()` 和 `onMessage()` 哪个先会被触发（一般情况下如果服务器不是立刻响应回包信息，总是会先返回 `upgrade()` 的结果。

:::