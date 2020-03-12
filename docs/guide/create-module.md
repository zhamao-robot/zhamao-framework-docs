# 编写模块

到现在为止，我们还在使用 zhamao-framework 的默认模块，在开始编写自己的模块应用之前，我们先说明一些编写代码的约定。

::: tip 提示

如不特殊说明，本章节所指的父目录均为 `src/Module/` 模块根目录。

:::

## 模块结构

要自定义编写模块代码的话，首先要选好自己起的模块名称（英文），为了遵从开发规范，最好使用驼峰命名（比如 HelloWorld.php）。

比如我们想编写一个机器人的娱乐模块，你可以直接将 `Entertain.php` 文件创建到父目录下，也可以以这样的目录结构创建到父目录下：

```
└── Entertain/
    └── Main.php
```

而二者的区别在于 `namespace` 命名空间。

比如第一种直接在父目录创建 `Entertain.php` 时，内部应该这样写：

```php
<?php
namespace Module;
use ZM\ModBase;
class Entertain extends ModBase { }
```

第二种方式构建时，`Main.php` 应该这样写：

```php
<?php
namespace Module\Entertain;
use ZM\ModBase;
class Main extends ModBase { }
```

简而言之，模块类的命名空间应该为 `Module\{你的子目录名}`，类名应该与 `xx.php` 的 `xx` 相同。同时，只要是用到需要注解的类，一定要继承 `ModBase` 基类，否则无法正常使用注解类和模块的基类方法。

::: danger 警告

如果没有遵守上方的规则的话，在加载框架时就会报错，无法找到对应的类。因为框架的注解解析依赖于文件名和命名空间。

:::

## 基类变量

这个是说明在各种不同事件触发后，会写到模块类基类中的类成员变量，方便对不同事件的快速响应。 下方是一个表，列出了所有可使用的成员变量对应注解事件的关系。这里建议先阅读下一章 **注解和事件** 再阅读本节。

| 变量名称                | 类型                                               | 可用的注解事件                                               |
| ----------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| `$this->server`         | `\Swoole\Server` 或 `\Swoole\Websocket\Server`     | `@SwooleEventAt("message")`<br />`@SwooleEventAt("close")`<br />`@SwooleEventAt("open")`<br />`@SwooleEventAfter("workerStart")` |
| `$this->frame`          | `\Swoole\WebSocket\Frame`                          | `@SwooleEventAt("message")`               |
| `$this->data`           | CQHTTP 发来的事件的数组                            | `@所有CQ事件`                                                |
| `$this->request`        | `\Swoole\Http\Request`                             | `@SwooleEventAt("request")`<br />`@RequestMapping()`<br />`@SwooleEventAt("open")` |
| `$this->response`       | `\ZM\Http\Response` 继承于 `\Swoole\Http\Response` | `@SwooleEventAt("request")`<br />`@RequestMapping()`         |
| `$this->fd`             | int，连接的 fd 号                                  | `@SwooleEventAt("close")`                                    |
| `$this->worker_id`      | int                                                | `@SwooleEventAfter("workerStart")`                           |
| `$this->connection`     | 基于 `\ZM\Connection\WSConnection` 的对象          | `@所有CQ事件`<br />`@SwooleEventAt("message")`<br />`@SwooleEventAt("open")` |
| `$this->handle_type`    | int，此模块此函数调用的标记模式                    | 所有在模块内的事件                                           |
| `$this->block_continue` | bool，用于标注断言，true 时不执行同类低等级的模块  | 所有在模块内的事件                                           |



## 基类方法

::: tip 提示

基类方法为方便各个事件函数内使用的工具函数，例如聊天机器人的快捷回复，获取发送此消息的人的 QQ 等。

:::

### reply()

- 参数：`reply($msg, $yield = false)`

- 用途：在 `message` 类触发的事件函数下快速回复用户文本。
- 用法示例：`$this->reply("今夜阳光明媚");`

> 对于简单的文本处理，也可以直接在函数内使用 `return "abc";` 返回字符串类型的也可回复文本。

### finalReply()

- 参数：`finalReply($msg, $yield = false)`
- 用途：同 `reply()`，但会自动忽略空消息并且将 `block_continue` 设置为 `true` 阻止其他模块继续处理此消息

### getMessage()

- 用途：获取消息文本
- 用法：`$msg = $this->getMessage();`

### getUserId()

- 用途：获取用户的QQ（id）

### getGroupId()

- 用途：获取QQ群号

### getMessageType()

- 用途：获取事件中的 `message_type` 参数

### getRobotId()

- 用途：获取收到事件的机器人自己的 QQ 号码

### getConnection()

- 用途：获取发来此 CQHTTP 事件的连接对象

> 关于连接对象的用途，请到 WebSocket 服务器 章节。

### setBlock()

- 用途：设置阻断

### waitMessage()

- 参数：`waitMessage($prompt = "", $timeout = 600, $timeout_prompt = "")`
- 用途：等待用户输入消息

`$prompt` 参数为回复用户的文本内容，`$timeout` 是等待用户回复的超时时间(秒)，`$timeout_prompt` 是超时后回复用户的文本。

用法示例：

```php
/**
 * @CQCommand("自我介绍")
 */
function yourName(){
    $r = $this->waitMessage("你叫啥名字呀？", 600, "你都10分钟不理我了，嘤嘤嘤");
    $this->finalReply("好的，可爱的机器人记住你叫 ".$r." 啦！以后多聊天哦！");
}
```

效果就是，给机器人发送 `自我介绍` 后，它问你 `你叫啥名字呀？`，如果你在 10 分钟内回复了机器人，则会回你下面一条句子，如果 10 分钟还没有回复，则机器人会回复你不理你的句子。

### getArgs()

- 参数：`getArgs(&$arg, $mode, $prompt_msg)`
- 用途：是 `waitMessage()` 的封装，常用于配合 `@CQCommand` 使用，在 `@CQCommand` 介绍中就用了此函数，可以看其中的例子。

`$arg` 为命令传递进入的参数引用。

`$mode` 支持：

- `ZM_MATCH_ALL`：获取除命令本身外的所有后续内容，例如 `疫情 iafwebfuaw 乏味`，match 后就会匹配到 `iafwebfuaw 乏味`。如果触发命令只有参数本身的时候，则调用 `waitMessage` 等待用户输入参数。
- `ZM_MATCH_NUMBER`：获取后续参数中第一个数字参数，例如 `疫情 北京 123`，match 后就会获取到 `123`。如果触发命令没有数字的时候，则调用 `waitMessage` 等待用户输入参数。
- `ZM_MATCH_FIRST`：获取命令后的第一个参数，例如 `疫情 北京 123`，match 后就会获取到 `北京`。如果触发命令只有参数本身的时候，则调用 `waitMessage` 等待用户输入参数。

`$prompt_msg`：当遇到等待的时候，向用户发送输入的提醒消息内容，同 `waitMesssage` 的 `$prompt`。



## 编写第一个功能

通过上方的了解，我们现在进行一个最简单的随机数功能的开发吧！

首先我们先确定自身想要处理的格式，例如 `随机数 1 100`，或者 `从1到100的随机数`。

我们先新建一个模块，或者在已有的模块类内新建函数，最后如下：

```php
<?php
namespace Module\Entertain;
use ZM\ModBase;
use ZM\Annotation\CQ\CQCommand;

class RandNum extends ModBase {
    /**
     * @CQCommand("随机数")
     * @CQCommand(regexMatch="*从*到*的随机数")
     */
    public function randNum($arg) {
      	// 获取第一个数字类型的参数
        $num1 = $this->getArgs($arg, ZM_MATCH_NUMBER, "请输入第一个数字");
      	// 获取第二个数字类型的参数
        $num2 = $this->getArgs($arg, ZM_MATCH_NUMBER, "请输入第二个数字");
        // 回复用户结果
        $this->reply("随机数是：".mt_rand(intval($num1), intval($num2)));
    }
}
```

