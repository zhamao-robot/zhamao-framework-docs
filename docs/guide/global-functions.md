# 全局函数

炸毛框架声明了一些全局函数，简化开发中繁琐的步骤。

## explodeMsg()

将字符串切割为多个参数的字符串。

::: tip 为什么不是 explode()

因为 `explode(" ", $msg)` 做的分割对于消息中如果存在多个空行则会出现空的参数，此函数的目的就是将空格消除，同时也会分隔多行内容为多个参数。

:::

```php
$msg = "我是参数1    我是参数2\n我是\t参数3";
$result = explodeMsg($msg, true);
// ["我是参数1", "我是参数2", "我是\t参数3"]
$result = explodeMsg($msg); //不填第二个参数默认为false，则默认分隔\t
// ["我是参数1", "我是参数2", "我是", "参数3"]
```

## unicode_decode()

将中文字符等 Unicode 编码转换为实际文本。

```php
$r = unicode_decode("\u4f60\u597d");
// 你好
```

## matchPattern()

根据通配符匹配文本。

```php
$pattern = "我要让*变得更*";
$context1 = "我要让自己变得更强";
$context2 = "我要让自己长得更帅";
$r1 = matchPattern($pattern, $context1); // true
$r2 = matchPattern($pattern, $context2); // false
```

## context()

获取当前协程绑定的上下文，见 [上下文](/guide/context.html)。

## debug()

效果同 `Console::debug($msg)`。

## zm_exec()

执行一句 shell 指令，执行过程中自动协程调度，不会阻塞其他事件。

- 参数：`$cmd`，命令内容
- 返回值：`array`，内容见 [Swoole 文档](https://wiki.swoole.com/#/coroutine/system?id=exec)。

```php
zm_exec("ls");
```

::: warning 注意

在炸毛框架中，请不要使用 PHP 内默认的 exec、system 等函数执行指令，会阻塞协程。

:::

## zm_cid()

获取当前协程的 id，效果同 `\Co::getCid()`，见 [Swoole 文档](https://wiki.swoole.com/#/coroutine/coroutine?id=getcid)。

## zm_yield()

协程挂起，效果同 `\Co::yield()`，见 [Swoole 文档](https://wiki.swoole.com/#/coroutine/coroutine?id=yield)。

## zm_resume()

协程恢复，效果同 `\Co::resume()`，见 [Swoole 文档](https://wiki.swoole.com/#/coroutine/coroutine?id=resume)。

## zm_timer_after()

异步计时器，在指定毫秒后执行代码。

- 参数1：`$ms`，单位 int，指定多少毫秒后执行
- 参数2：`$callable`，类型为 `callable`，可以是闭包函数，也可以是已存在的对象方法等。

```php
zm_timer_after(1000, function() {
  Console::info("我好了");
});
```

## zm_timer_tick()

异步计时器，每隔指定毫秒执行一次代码。

参数同上方 zm_timer_after。

```php
zm_timer_tick(1000, function() {
  Console::info("我不知道写什么内容了，每一秒都给你卖个萌吧o(*≧▽≦)ツ");
});
```

