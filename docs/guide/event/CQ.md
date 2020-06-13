# QQ 机器人事件和注解

QQ 机器人事件是指 CQHTTP 插件发来的 Event 事件，被框架处理后触发到单个类中方法的事件。

为了便于开发，这里的注解类对应 CQHTTP 插件返回的 `post_type` 类型，对号入座即可。

::: tip 提示

在使用注解绑定事件过程中，如果无 **必需** 参数，可一个参数也不写，效果就是此事件任何情况下都会调用此方法。例如：`@CQMessage()` 

:::

## CQMessage()

QQ 收到消息后触发的事件对应注解。

- 名称：`@CQMessage`
- 对应 `post_type`：`message`
- 命名空间：`ZM\Annotation\CQ\CQMessage`
- 用途：当收到 `post_type == 'message'` 类的事件上报（即用户消息）时触发事件

参数和 CQHTTP 插件中提供的文档内支持的参数完全一致，有：

- *message_type：消息类型，有 `private`，`discuss`，`group`
- user_id，group_id，discuss_id，message，raw_message，level（level 见前面的 Swoole 事件激活写的帮助）

下面这个例子的注释用途就是：

- 在用户 QQ 为 `123456` 的用户私聊给机器人发消息后机器人回复内容。
- 用户发送文字为 `hello` 时返回 `你好啊，xxx` 的消息。

```php
<?php
namespace Module\Example;

use ZM\Annotation\CQ\CQMessage;

class Hello {
    /**
     * @CQMessage(message_type="private",user_id=123456)
     */
  	public function test(){
        return "你和机器人私聊发送了这些文本：".context()->getMessage();
    }
    /**
     * @CQMessage(message="hello")
     */
    public function hello(){
        return "你好啊，".context()->getUserId();
    }
}
```

## CQCommand()

此注解是对 `@CQMessage` 类别的再封装，是命令解析格式处理消息的利器。例如，你想写一个疫情上报，指令是 `疫情 城市名称`，那么此方式来解析用户消息会更加方便。

- 名称：`@CQCommand`
- 命名空间：`ZM\Annotation\CQ\CQCommand`
- 用途：消息指令类上报触发
- 支持的参数：`match`，`regexMatch`，`alias`，`level` （有先后顺序）

我们以参数 `match` 写一个简单的 demo：

```php
<?php
namespace Module\Example;

use ZM\Annotation\CQ\CQCommand;

class Hello {
    /**
     * @CQCommand("疫情")
     */
    public function virus($arg){
        $city = ctx()->getArgs($arg, ZM_MATCH_ALL, "请输入你的城市名称");
        return "城市 ".$city." 的疫情状况如下："."{这里假装是疫情接口返回的数据}";
    }
}
```

而这个时候，框架强大的命令解析和一些特殊的分词方式，效果就是：

- 向机器人发送 `疫情 上海` 时，机器人会直接给你返回：`城市 上海 的疫情状况如下`
- 向机器人发送 `疫情` 时，机器人会先提醒你输入你的城市名称，你回复 `上海`，它就会回复你上海的疫情状况。

简单来说，上面涉及了两个新内容，`@CQCommand` 里面第一个参数 `match` 的作用是匹配第一个分词 `疫情`。方法中 `$this->getArgs()` 方法是获取指令中的参数，如果参数不存在则回你一条消息后等你输入参数（此方法为模块基类中的方法，具体请见 [模块基类方法](/guide/create-module.html#基类方法)）。当然你也可以通过 `$arg` 变量直接获取框架内部为你切分好的参数数组。比如上述你发送的是 `疫情 上海`，则此数组内容就是：

```
[
	0 => "疫情",
	1 => "上海"
]
```

::: tip 提示

如果是按照参数的顺序写注解参数的话，可以不写参数的名字，如上方例子，`疫情` 就是参数 `match` 。

同时 `match` 参数下的分词逻辑是：文字和数字分割，文字和空格分割，文字和 `\t` 分割。同时支持多个空格，比如 `疫情 (这里假装有一堆空格) 上海` 也是同样的效果。

:::

**第二个参数** `regexMatch` 是按表达式进行匹配文本的命令方式，与 `match` 参数只能二选一。

这里的 `regexMatch` 匹配不是正则表达式匹配，而是框架支持的一个简单的文字匹配规则表达式。其中表达式规则如下：

- 星号(*) 代表匹配到的参数
- 普通其他文字代表要匹配的文字

例如：`*疫情怎么样了` ，效果就是，`上海疫情怎么样了` 这么问的时候，参数列表中就是 `上海`。多个星号就匹配多个参数，可以在文本内任意位置，不可两个星号放在一起匹配。

**第三个参数** alias 是别名数组，如果有多个别名指令消息需要匹配，则使用即可：

```php
/**
 * @CQCommand(match="你好",alias={"你好啊","你叫啥","你是啥"})
 */
public function hello() {
  return "你好啊，我叫炸毛机器人！";
}
```

> 别名在 1.5.4 版本起可用。

## CQNotice()

- 名称：`@CQNotice`
- 对应：`post_type`：`notice`
- 命名空间：`ZM\Annotation\CQ\CQNotice`
- 用途：当收到 `post_type == 'notice'` 类的事件上报（即通知）时触发事件

参数也和 CQHTTP 插件提供的上报参数一致，有：

- notice_type，sub_type，group_id，operator_id 等，按需组合使用

```
@CQNotice() //所有通知都触发
@CQNotice(notice_type="group_increase") //在群成员增加的通知才触发
```

## CQRequest()

- 名称：`@CQRequest`
- 对应 `post_type`：`request`
- 命名空间：`ZM\Annotation\CQ\CQRequest`
- 用途：当收到 `post_type == 'request'` 类的事件上报（即请求类事件）时触发

参数依然和 CQHTTP 插件提供的上报参数一致，有：

- request_type，sub_type，user_id，comment，level 等

```
@CQRequest() //所有请求都触发
@CQRequest(request_type="friend") //加机器人好友时才触发
```

## CQMetaEvent()

- 名称：`@CQMetaEvent`
- 对应 `post_type`：`meta_event`
- 命名空间：`ZM\Annotation\CQ\CQMetaEvent`
- 用途：CQHTTP 插件的元事件上报时触发

参数列表：`meta_event_type`，`sub_type`，`level`。

## CQBefore()

- 作用：在以上涉及的事件触发前会触发的事件（预处理，比如过滤消息什么的）
- 名称：`@CQBefore`
- 命名空间：`ZM\Annotation\CQ\CQBefore`
- 参数：`cq_event`，`level`
- 函数返回值：`true` 或 `false`。如果返回 `false` 则不继续执行其他任何 `@CQMessage` 注解的函数方法。

怎么用？例如在事件 `CQMessage` 触发前要过滤所有消息含有 `谷歌` 的消息，不让框架响应：

```php
<?php
namespace Module\Example;

use ZM\Annotation\CQ\CQBefore;
use ZM\Annotation\CQ\CQMessage;
class Test {
    /**
     * @CQBefore("message")
     */
    public function filter(){
        // 可用于敏感词，如政治相关的词语不响应其他模块
        if(mb_strpos(ctx()->getMessage(), "谷歌") !== false) return false;
        else return true;
    }
}
```

::: warning 注意

在设置了 `level` 参数后，如果设置了多个 `@CQBefore` 监听事件函数，更高 `level` 的事件函数返回了 `false`，则低 `level` 的绑定函数不会执行，所有 `@CQMessage` 绑定的事件也不会执行。

::: 

你也可以使用 `@CQBefore` 做一些消息的转发和过滤。比如你想去除用户发来的文字中的 emoji、图片等 CQ 码，只保留文本：

```php
/**
 * @CQBefore("message")
 */
public function filter(){
  context()->setMessage(trim(CQ::removeCQ(context()->getMessage())));
  return true;
}
```

## CQAfter()

- 作用：在以上涉及的事件触发后会触发的事件（后期处理，其实没什么用，就是为了对称，有前有后，可自行开发用途）
- 名称：`@CQAfter`
- 命名空间：`ZM\Annotation\CQ\CQAfter`
- 参数：`cq_event`，`level`
- 函数返回值：`true` 或 `false`。如果返回 `false` 则不继续执行其他低等级的 `@CQAfter` 绑定的事件函数。

## CQAPISend()

- 作用：此注解在框架调用 CQHTTP API 接口（即发送消息、请求 API 等操作）时触发，或者可以直接引申理解为：在使用 `ZMRobot` 组件时触发的注解事件
- 名称：`@CQAPISend`
- 命名空间：`ZM\Annotation\CQ\CQAPISend`
- 参数：`action`，`level`
- 常见用途：对发送的消息记录 log 日志
- 函数请求参数：`logger($action, $params, $self_id)`，`$action` 为调用的 API 名称，`$params` 为调用的参数，例如发消息时含有参数 `["user_id" => 123, "message" => "hahah"]`，`$self_id` 为目标发送的机器人 QQ。

参数 `action` 默认为空，表示所有 API 请求都会触发。如果填写 `send_private_msg` 等 API 名称，则只对应 API 被调用时触发。

```php
/**
 * @CQAPISend()
 */
public function logger($action, $params, $self_id) {
  if(in_array($action, ["send_private_msg","send_group_msg","send_discuss_msg"])){
  	Console::info("机器人 $self_id 发送了消息：".$params["message"]);
  }
}
/**
 * @CQAPISend("send_private_msg")
 */
public function sendLogger($action, $params, $self_id){
  Console::info("机器人 $self_id 给 ".$params["user_id"]." 私发了消息：".$params["message"]);
}
```

## CQAPIResponse()

在请求 HTTP API 后返回的状态码对应的触发，多用于错误状态码的事件绑定，每个 `retcode` 只能全局绑定一个函数。

- 名称：`@CQAPIResponse`
- 命名空间：`ZM\Annotation\CQ\CQAPIResponse`
- 参数：`retcode（必需，int类型）`
- 常见用途：在发送异常后做 log 日志或其他错误报告用途，例如 **-23** （私聊发消息不是好友，没发出去）的绑定，采取 log 日志记录或调用其他途径给用户发消息。

::: warning 注意

一定要谨慎在此事件的函数下调用 HTTP API（使用 ZMRobot 组件），否则很有可能会产生循环报错！

:::

```php
/**
 * @CQAPIResponse(-23)
 */
public function onNoneFriendLog($origin, $response) {
  Console::info("你要发的 \"".$origin["params"]["message"]."\"，它没发出去，不是好友！");
}
```

上面的 `$origin` 参数为请求到 HTTP API 的原始数据数组，`$response` 为 HTTP API 返回带 `retcode` 的结果数组。

