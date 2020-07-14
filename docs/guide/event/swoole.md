# Swoole 事件注解

Swoole 事件注解指的是由 Swoole 定义的事件所对应的注解类，例如收到 HTTP 或 WebSocket 连接后执行的事件函数。

## SwooleEventAt()

- 名称：`@SwooleEventAt`
- 命名空间：`ZM\Annotation\Swoole\SwooleEventAt`
- 用途：当 Swoole 事件触发时调用

参数依次是：

- *type：事件类型名称，支持 `open`，`close`，`request`，`message`。对应监听事件类型作用可查看 [Swoole 文档](https://wiki.swoole.com/)
- rule：规则语句，如果不为空则符合条件才触发调用此函数。规则语句语法见进阶中 [规则语句](#规则语句)
- level：函数触发调用优先值，数字越大该方法越先被调用。

```php
/**
 * @SwooleEventAt(type="request")
 */
public function onRequest() {
  Console::info("我收到了一个 HTTP 请求，我现在要给他返回 403！");
  $response = context->getResponse();
  $response->status(403);
  $response->end("403 Forbidden!");
}
```

## SwooleEventAfter() (已废弃)

- 名称：`@SwooleEventAfter`
- 命名空间：`ZM\Annotation\Swoole\SwooleEventAfter`
- 用途：当 Swoole 事件激活调用结束后调用

参数同 `@SwooleEventAt`。但 type 类型多支持 `workerStart`。

::: warning 为什么废弃呢

因为 1.3.0 版本开始，所有事件包括 `@SwooleEventAt` 也支持插入中间件了，这个事件也就对于开发来说重复了。所以将会在未来的版本中废弃，请尽快更替到使用 [中间件](/guide/event/middleware.html)。

:::

## OnStart()

在框架启动或 reload 之后执行的代码，常用于初始化内存中的缓存变量，比如加载好友列表到内存等操作。

- 名称：`@OnStart`
- 命名空间：`ZM\Annotation\Swoole\OnStart`
- 用途：在框架启动后执行的功能代码，一般用于 ZMBuf 和数据库等初始化。

```php
/**
 * @OnStart()
 */
public function onStart() {
  ZMBuf::set("start_time", time());
}
/**
 * @CQCommand("启动时间")
 */
public function startTime() {
  return "框架启动时间是：".date("Y-m-d H:i:s", ZMBuf::get("start_time"));
}
```

## OnTick()

用于声明计时器。此计时器是毫秒级别的。用于执行定时任务等功能。注意设置的 tick 间隔不能超过 86400000 耗秒（也就是 1 天）

- 名称：`@OnTick`
- 命名空间：`ZM\Annotation\Swoole\OnTick`
- 用途：上面说了
- 参数：`tick_ms`，int 类型，单位是毫秒

```php
/**
 * @OnTick(60000)
 */
public function onTick() {
  Console::info("我每隔1分钟就会输出到终端哦！");
}
```

::: warning 注意

在计时器里，如果使用上下文 `ctx()` 的话，会报错，如果使用上下文，请先将当前协程上下文初始化，再使用。

```php
set_coroutine_params([]);
```

为了保持性能，计时器不采用任何封装，直接调用对应函数，一旦出现报错将被当作 fatal error，退出程序。在编写计时器内的代码时，应尤其注意代码的逻辑问题，尽量不要使用同步代码。

:::

## OnSave()

> 此注解在 1.4 版本起可用。

命名空间：`ZM\Annotation\Swoole\OnSave`

框架中有定时储存缓存变量的 `@SaveBuffer`，这个注解绑定的函数将会在自动保存变量时被触发，可以保存你自己的复杂缓存结构。在执行终端命令 `save` 或调用 `DataProvider::saveBuffer()` 或定时保存时会触发。

```php
/**
 * @OnSave()
 */
public function onSave() {
  Console::info("正在保存...");
  // write your code here.
}
```

## OnEvent()

> 此注解在 1.6 版本起可用。

由于框架是用 Swoole 构建的，而框架内的注解事件是基于 Swoole 提供的事件扩展的，所以框架支持用户自定义所有类型的 Swoole Server 事件，详见 [Swoole 文档 - 事件](https://wiki.swoole.com/#/server/events)。

但这个注解事件相对于上面其他任何注解的工作方式都是不同的。`@OnEvent` 注解的事件函数调用的进程可能不在 Worker 进程内，比如声明了 TaskWorker 进程的工作函数，代码就会在 TaskWorker 进程运行。有关 Swoole 进程概念，请见 [进阶 - 多进程](/advanced/multi-process.html)。

下面是一个使用 Swoole 的 TaskWorker 进程的例子，大致功能是算每个数的平方：

```php
class CustomEvent  //假设在 src/Module/Example/CustomEvent.php 中
{
  /**
   * @OnEvent("task")
   */
  public function onTask(\Swoole\Server $server, \Swoole\Server\Task $task) {
    $task->finish(array_map(function ($x) {
      return $x * $x; 
    }, $task->data));
	}
}

class Hello //假设在 src/Module/Example/Hello.php 中
{
  /**
   * @CQCommand("test")
   */
  public function hello() {
    $r = ZMBuf::$server->taskCo([[1,2,3,4]], 5); //这里会协程等待 TaskWorker 调用 finish
    var_dump($r);
  }
}
```

写好代码后，需要在 `global.php` 配置文件的 `server_event_handler_class` 项中填入 CustomEvent 类的名称：

```php
$config['server_event_handler_class'] = [
    \Framework\ServerEventHandler::class, //默认不可删除，否则会不能使用框架
   	\Module\Example\CustomEvent::class
];
```

::: warning 注意

写在 `server_event_handler_class` 配置中的类，会在框架启动时候就加载到内存，不能通过 reload 进行重新加载，必须停止服务器后再运行才能加载。

:::

