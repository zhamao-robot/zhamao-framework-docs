---
sidebarDepth: 2
---
# 注解和事件

## 概念介绍

注解（Annotation）又称标注，Java 最早在 2004 年的 JDK 5 中引入的一种注释机制。目前 PHP 官方版本并未提供内置元注解和注解概念，但我们通过 `ReflectionClass` 反射类解析 PHP 代码注释从而实现了自己的一套注解机制。

在炸毛框架中，我们所有事件的绑定均采用这一方式进行调用模块内各个方法。包括 Swoole 自身的框架启动事件、WebSocket 连接握手事件、HTTP 请求事件等等，也包括 CQHTTP 发来的事件，如`message`，`notice`，`request` 等。

## 如何使用

就像我们日常开发写注释一样，只需在类、方法或成员变量上方按规则添加注释即可，这里以默认自带的 `Hello` 模块类为例子：

```php
<?php
namespace Module\Example;

use ZM\Annotation\CQ\CQCommand;

class Hello
{
    /**
     * @CQCommand(match="你好")
     * @return string
     */
    public function hello(){
        return "你好啊，我是由炸毛框架构建的机器人！";
    }
}
```

::: warning 注意

注意需引入相关注解（Annotation）类，**且必须** 以 `/**` 开始并以 `*/` 结束，否则会导致无法解析！**

上方 `@return` 为 IDE 自动生成，不需要管。

:::

上方的 `@CQCommand` 为此方法绑定的注解类，这个例子内注解类的用途是收到 QQ 消息后如果消息第一个词匹配到 `你好` 的话，就执行调用此 `hello` 方法。注意 `CQCommand` 和其他任何后面讲到的注解类一样，需先 `use ZM\Annotation\` 下的对应注解类，否则也不能正常使用。

注解类不仅可以给类中的方法添加，也可以给类本身添加。例如框架提供了快速关闭此模块的一个注解：

```php
<?php
namespace Module\Example;

use ZM\Annotation\CQ\CQCommand;
use ZM\Annotation\Module\Closed;

/**
 * Class Hello
 * @Closed()
 */
class Hello { }
```



下面的段落是介绍框架内可以使用的注解类及其各个注解类会触发的事件。

> 标有 * 的参数为使用注解时必须带有的参数

## Swoole 事件对应注解类

Swoole 事件指 Swoole server 本身的触发事件，比如 HTTP 响应等。

### Swoole 事件激活

- 名称：`@SwooleEventAt`
- 命名空间：`ZM\Annotation\Swoole\SwooleEventAt`
- 用途：当 Swoole 事件触发时调用

参数依次是：

- *type：事件类型名称，支持 `open`，`close`，`request`，`message`。对应监听事件类型作用可查看 [Swoole 文档](https://wiki.swoole.com/)
- rule：规则语句，如果不为空则符合条件才触发调用此函数。规则语句语法见进阶中 [规则语句](#规则语句)
- level：函数触发调用优先值，数字越大该方法越先被调用。

### Swoole 事件发生后

- 名称：`@SwooleEventAfter`
- 命名空间：`ZM\Annotation\Swoole\SwooleEventAfter`
- 用途：当 Swoole 事件激活调用结束后调用

参数同 `@SwooleEventAt`。但 type 类型多支持 `workerStart`。

用法示例（`src/Module/Example/Test.php`）：

```php
<?php
namespace Module\Example;
use Framework\Console;
use ZM\Annotation\Swoole\SwooleEventAfter;
class Test {
    /**
     * @SwooleEventAfter(type="workerStart",level=100)
     */
  	public function afterWorkerStart(){
        Console::info("我是在框架启动后执行的代码");
    }
}
```

### 框架启动时

- 名称：`@OnStart`
- 命名空间：`ZM\Annotation\Swoole\OnStart`
- 用途：效果同 `@SwooleEventAfter("workerStart")`

## CQHTTP 事件对应注解类

CQHTTP 事件是指 CQHTTP 插件发来的 Event 事件，被框架处理后触发到单个类中方法的事件。

为了便于开发，这里的注解类对应 CQHTTP 插件返回的 `post_type` 类型，对号入座即可

### CQMessage 

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

class Main {
    /**
     * @CQMessage(message_type="private",user_id=123456)
     */
  	public function test(){
        return "你和机器人私聊发送了这些文本：".ctx()->getMessage();
    }
    /**
     * @CQMessage(message="hello")
     */
    public function hello(){
        return "你好啊，".ctx()->getUserId();
    }
}
```

### CQNotice

- 名称：`@CQNotice`
- 对应：`post_type`：`notice`
- 命名空间：`ZM\Annotation\CQ\CQNotice`
- 用途：当收到 `post_type == 'notice'` 类的事件上报（即通知）时触发事件

参数也和 CQHTTP 插件提供的上报参数一致，有：

- notice_type，sub_type，group_id，operator_id 等，按需组合使用

::: tip 提示

在使用注解绑定事件过程中，如果无 **必需** 参数，可一个参数也不写，效果就是此事件任何情况下都会调用此方法。例如：`@CQMessage()` 

:::

### CQRequest

- 名称：`@CQRequest`
- 对应 `post_type`：`request`
- 命名空间：`ZM\Annotation\CQ\CQRequest`
- 用途：当收到 `post_type == 'request'` 类的事件上报（即请求类事件）时触发

参数依然和 CQHTTP 插件提供的上报参数一致，有：

- request_type，sub_type，user_id，comment，level 等

### CQMetaEvent

- 名称：`@CQMetaEvent`
- 对应 `post_type`：`meta_event`
- 命名空间：`ZM\Annotation\CQ\CQMetaEvent`
- 用途：CQHTTP 插件的元事件上报时触发

参数列表：`meta_event_type`，`sub_type`，`level`。

### CQCommand

此注解是对 `@CQMessage` 类别的再封装，是命令解析格式处理消息的利器。例如，你想写一个疫情上报，指令是 `疫情 城市名称`，那么此方式来解析用户消息会更加方便。

- 名称：`@CQCommand`
- 命名空间：`ZM\Annotation\CQ\CQCommand`
- 用途：消息指令类上报触发
- 支持的参数：`match`，`regexMatch`，`level` （有先后顺序）

我们以参数 `match` 写一个简单的 demo：

```php
<?php
namespace Module\Example;

use ZM\Annotation\CQ\CQCommand;

class Test {
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

### CQBefore

- 作用：在以上涉及的事件触发前会触发的事件（预处理，比如过滤消息什么的）
- 名称：`@CQBefore`
- 命名空间：`ZM\Annotation\CQ\CQBefore`
- 参数：`cq_event`，`level`
- 函数返回值：`true` 或 `false`。如果返回 `false` 则不继续执行其他任何 `@CQMessage` 注解的函数方法。

怎么用？例如在事件 `CQMessage` 触发前要过滤所有消息含有 `谷歌` 的消息：

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
        if(mb_strpos(ctx()->getMessage(), "谷歌") !== false) return false;
        else return true;
    }
}
```

::: warning 注意

在设置了 `level` 参数后，如果设置了多个 `@CQBefore` 监听事件函数，更高 `level` 的事件函数返回了 `false`，则低 `level` 的绑定函数不会执行，所有 `@CQMessage` 绑定的事件也不会执行。

::: 

### CQAfter

- 作用：在以上涉及的事件触发后会触发的事件（后期处理，其实没什么用，就是为了对称，有前有后，可自行开发用途）
- 名称：`@CQAfter`
- 命名空间：`ZM\Annotation\CQ\CQAfter`
- 参数：`cq_event`，`level`
- 函数返回值：`true` 或 `false`。如果返回 `false` 则不继续执行其他低等级的 `@CQAfter` 绑定的事件函数。

## 运行流程

![diagram](../.vuepress/public/images/diagram2.png)

## 模块类相关注解类（非事件）

### Closed

- 名称：`@Closed`
- 命名空间：`ZM\Annotation\Module\Closed`
- 无参数
- 作用：当对模块的类添加了此注解后，此类下的所有函数的所有注解和事件均不解析。当有模块或功能需要暂时关闭时会用到此注解。

例子：

```php
<?php
namespace Module\Example;

use ZM\Annotation\Module\Closed;
/**
 * @Closed()
 */
class Test { }
```



### SaveBuffer

- 名称：`@SaveBuffer`
- 命名空间：`ZM\Annotation\Module\SaveBuffer`
- 参数：`buf_name`，`sub_folder`
- 作用：添加一个自动保存的缓存变量，供模块内各个功能使用，在框架启动后触发。关于缓存类，见 [缓存类](/guide/component.html#zmbuf-缓存类)

示例：

```php
<?php
namespace Module\Example;

use ZM\Annotation\Module\SaveBuffer;
/**
 * @SaveBuffer(buf_name="test_list",sub_folder="Test")
 */
class Test { }
```

### InitBuffer
- 名称：`@InitBuffer`
- 命名空间：`ZM\Annotation\Module\InitBuffer`
- 参数：`buf_name`
- 作用：将缓存变量名字为 `buf_name` 的缓存初始化为空数组，供代码使用。关于缓存类，见 [缓存类](/guide/component.html#zmbuf-缓存类)

示例：
```php
<?php
namespace Module\Example;

use ZM\Annotation\Module\InitBuffer;
/**
 * @InitBuffer("my_variable_name")
 */
class Test { }
```

## HTTP 请求事件触发注解

HTTP 请求触发类的注解在 [HTTP 服务器](/guide/http-server.html) 章节说明。



## 规则语句

规则语句是适用于所有支持 `rule` 参数的注解使用的一套框架自定的一套语法规则。不同注解的规则可使用的规则限定不同，需要对症下药。

目前来说，支持 `Rule` 参数的注解只有 `@SwooleEvent(At/After)` 两种。

### 语句结构

规则类型:规则参数[,规则参数2]

### 示例用法

```php
/**
 * @SwooleEventAt(type="request",rule="containsGet:username")
 */
public function onLogin(){
    $r = ctx()->getRequest()->get["username"];
    ctx()->getResponse()->end("你好，".$r."，你已经成功登录");
}
```



### 规则类型列表

1. `connectType`：

   - 目标：在 `@SwooleEventAt("message")`，`@SwooleEventAt("open")`，

     `@SwooleEventAt("close")` 下可用。

   - 示例：`connectType:qq` （如果是从 qq 的 WS 链接过来的事件则触发）

   - 支持类型：`qq`，`unknown`。可自行根据 WebSocket 服务器 章节进行自定义。

2. `containsGet` 和 `containsPost`：

   - 目标：在 `@SwooleEventAt("request")` 下可用。
   - 用途：过滤 GET / POST 参数是否存在。
   - 示例：`containsGet:username,password`

3. `containsJson`：
   - 目标：同 `2`
   - 用途：过滤 POST 过来的 Json 参数是否存在
   - 示例：`containsJson:username,password`
4. `dataEqual`：
   - 目标：在 `@SwooleEventAt("message")` 下可用。
   - 用途：比较 WebSocket 发来的数据是否匹配相等。
   - 示例：`dataEqual:ping`