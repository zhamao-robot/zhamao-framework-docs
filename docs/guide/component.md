# 框架组件

## CQHTTP API 

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



## CQ 码

框架提供了 CQ 码的封装，你可以在任何位置使用封装好的 CQ 码类。

- 命名空间：`use ZM\API\CQ;`

```php
$this->reply(CQ::image("a.jpg"));
//执行后CQ::image被替换为字符串："[CQ:image,file=a.jpg]"
```

返回 CQ 码，支持 CQHTTP 插件提供的 [增强特性](https://cqhttp.cc/docs/#/CQCode?id=增强功能列表)。

```php
//$file 为图片文件名，支持增强特性
//$cache 为是否缓存，默认为否
CQ::image($file, $cache = false);
```



## 数据管理

数据管理类是 `DataProvider`，命名空间：`ZM\Utils\DataProvider`。方法均为静态方法。

### getResourceFolder()

获取资源文件夹目录。

### addSaveBuffer()

同注解 `@SaveBuffer` 的作用。

### saveBuffer()

保存所有自动保存的缓存变量到文件



## ZMUtil 杂项

### checkWait()

此函数为内部调用，用途是在 `WorkerStart` 事件执行完之前其他事件需要等待，待其执行完之后会恢复执行。

### stop()

停止运行框架，并保存所有数据和断开所有连接。

### getHttpCodePage()

获取 HTTP 状态对应的默认页面的内容。

### reload()

重启框架，重新加载除 `src/Framework/` 外的所有代码文件。

### getCQ()

解析CQ码。

- 参数：`getCQ($msg);`：要解析出 CQ 码的消息。
- 返回：`数组 | null`，见下表

| 键名   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| type   | CQ码类型，比如 `[CQ:at]` 中的 `at`                           |
| params | 参数列表，比如 `[CQ:image,file=123.jpg,url=http://a.com/a.jpg]`，params 为  `["file" => "123","url" => "http://a.com/a.jpg"]` |
| start  | 此 CQ 码在字符串中的起始位置                                 |
| end    | 此 CQ 码在字符串中的结束位置                                 |





## ZMBuf 缓存类

因为炸毛框架是基于 cli 的常驻内存运行方式，你可以将文件、数据库、需要频繁读写的变量读到内存中使用，并设置定时保存以防丢失。

框架提供了一个 `ZMBuf` 类，此类管理了框架所有保存到内存中的全局变量，在模块中你可以调用以下方法进行操作。

`ZMBuf` 类的命名空间在：`Framework\ZMBuf`，使用前需先 use 或 IDE 写代码时自动生成。

### ZMBuf::get()

- 用途：获取一个变量。
- 参数：`$name`，变量名称。
- 返回：`mixed`，取决于你 set 的数据。当变量不存在时，返回 `null`。

### ZMBuf::set()

- 用途：设置一个变量。
- 参数：`$name`，`$value`。
- 示例：`ZMBuf::set("current_time", date("H:i:s"));`

### ZMBuf::append()

- 用途：同 `set`，效果不同的是，`$name` 变量名字的缓存为数组，这个方法将数据追加到数组尾部。
- 参数：`$name`，`$value`。

### ZMBuf::unsetCache()

- 用途：删除缓存内容。
- 参数：`$name`

### ZMBuf::globals()

- 用途：获取全局配置文件 `global.php`。
- 参数：`$key`，配置文件的属性名。
- 示例：`ZMBuf::globals("sql_config");`

### ZMBuf::$atomics

- 通途：储存框架启动时初始化的原子计数器
- 类型：数组，键名为计数器名称，键值为计数器对象 `\Swoole\Atomic`

> 剩余的一些方法在一般用户编写代码过程中用不到，故文档暂时不列出，框架内写了一些简单的注释可供参考。

### 自动保存的缓存变量

前面的注解和事件以及模块编写均提到了自动保存的缓存变量，自动保存的缓存变量就是储存到 `ZMBuf` 的变量，只不过会定时储存到文件，不会因为框架关闭或重启而丢失数据。

和普通的 `ZMBuf::set` 方式设置的缓存变量的区别是，自动保存的变量只会自动保存，调用和修改起来两者是完全一致的。

比如，你在前面用注解给模块加载了一个自动保存的缓存变量：

```php
/**
 * @SaveBuffer("ipad_list")
 */
```

在本模块内，你就可以在任意位置进行 `ZMBuf::get("ipad_list")` 的值，也可以 `set` 来改变内部的值。

其中，`buf_name` 等同于上面的缓存变量名称，`sub_folder` 参数为缓存变量在 `config/` 目录下的子目录名称。如果不写，则默认在 `config/` 根目录下创建储存文件。