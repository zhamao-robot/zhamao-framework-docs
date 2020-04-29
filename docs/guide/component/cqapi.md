# CQAPI

::: danger 不推荐

CQAPI 为旧的调用 coolq-http-api 插件的方式，由于写法比较落后和繁琐，将在 2.0 版本移除。现在推荐使用新的 `ZMRobot` 对象进行 API 的调用。

:::

在框架内，不仅可以使用基类函数来进行操作，也可以直接使用封装好的 CQHTTP API 接口。此接口组件所有调用方式均为静态方法，可在模块任意位置调用。

::: warning 注意

由于框架本身支持多机器人同时连接，所以所有 API 请求操作均需要带有要请求到的机器人的 id 或链接对象。

:::

### 调用方式

首先就是需要在模块最上面 `use ZM\API\CQAPI;` 才能使用。

用法：`CQAPI::API名称($robot, $param = [], $yield = null);`

API 名称为 CQHTTP 对应的 API 名称，例如 `send_private_msg`，`get_status` 等。可到 CQHTTP 文档 - API 查看。

参数解释：

- `$robot` 为机器人的 QQ 或连接对象。连接对象可通过 `$this->getConnection()` 获取。对象解释请见 **WebSocket 服务器** 一章。
- `$param` 对应 CQHTTP API 接口需要的参数，参见 [CQHTTP 文档 - API](https://cqhttp.cc/docs/#/API)。
- `$yield` 为 API 请求返回结果后处理的方式。如果 `$yield` 是匿名函数的话，则会在 API 请求返回后回调匿名函数。如果是 `true` 的话，则会在发送 API 请求后协程等待，收到结果后作为 API 函数调用的返回值。

::: warning 注意

当使用 `$yield = true` 时，会将处理当前消息的整个协程挂起，直到 CQHTTP 插件返回此 API 执行的结果。结果返回值自动处理成了数组，返回内容参见 [CQHTTP 文档 - API](https://cqhttp.cc/docs/#/API)。

:::

框架封装方式为 PHP 的魔术方法映射对应 API 进行操作，所以对应 API 可以查阅 [CQHTTP 文档 - API](https://cqhttp.cc/docs/#/API)。

例子：

```php
CQAPI::send_private_msg($this->getConnection(), ["user_id" => 123456, "message" => "我是复读机"]);
```

### API 兼容性

当你在使用 PhpStorm 或 IDEA 等 IDE 编写代码时，如果为了保证代码风格统一，在写 CQAPI 调用时，不仅可以写上面提到的和 CQHTTP 文档相同的 API，也可以使用驼峰命名法编写 API名称。例如 `CQAPI::send_group_msg` 可以写成 `CQAPI::sendGroupMsg`。

如果在使用过程中调用了未知的 API 时，框架会抛出异常，中断此次事件。

### 响应处理

对于上面提到的 `$yield` 参数，就是用来处理 API 响应结果的。当其为匿名函数，如下，你可以像下面这样处理结果。比如向终端报告消息处理正常：

```php
CQAPI::send_group_msg(12345, ["group_id" => 100000, "message" => "test"], function ($response, $origin){
    if($response["retcode"] == 200){
        echo "成功地发出了消息: ".$origin["params"]["message"];
    }
});
```

也可以使用 `$yield = true` 协程等待，在返回结果后会作为 API 调用的返回值。

```php
$msg = CQAPI::send_group_msg(123, ["group_id" => 12345, "message" => "test"], true);
if($msg["retcode"] == 200) {
    echo "成功发出了消息：".$msg["params"]["message"];
}
```

::: tip 提示

对于 模块基类的快速回复方法，也可以使用如上的响应方式，因为 `$this->reply()`的第二个参数也是 `$yield`，和上方相同。

:::