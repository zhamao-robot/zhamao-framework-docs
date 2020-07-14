# 调试

这里说明一些框架和模块的调试方法，比如终端输出 Log、下断点、运行测试单元等。

## 下断点调试

::: tip 版本提示

下断点功能在 1.4 版本开始可用。

:::

框架支持了 Psysh 断点调试功能，你可以在任意位置方便地下断点进行调试。

众所周知，Swoole 不支持 xdebug 等扩展，所以对 Swoole 程序调试起来没有那么方便。但因为 Swoole 是运行到命令行的 PHP 程序，而命令行的 PHP 有非常著名的 REPL 环境——Psysh，和 Swoole 组合将可以很方便地下断点进行调试。

在启动框架前，你需要加上参数 `--debug-mode`，或者在最新版本框架里的 `config/global.php` 文件中将 `$config['debug_mode']` 改为 true。（如果你是从旧版本升级的框架，可能会没有此选项，手动加上即可。注意要是带参数启动的话，必须含有 `server` 的命令选项，如下：

```bash
# 普通方式启动
php bin/start server --debug-mode
# Phar方式启动
php server.phar server --debug-mode
# Composer 初始化项目启动
vendor/bin/start server --debug-mode
```

**下断点一句话：**

```php
eval(ZM_BREAKPOINT);
// 或者简写：eval(BP);
```

比如你在代码中，可以以这样的方式下断点：

```php
/**
 * @RequestMapping("/index")
 */
public function index() {
  $name = "Steve";
  eval(ZM_BREAKPOINT);
  ctx()->getResponse()->end("Your name: $name");
}
```

我们在断点处在终端内把 `$name` 修改：

```
$name = "Bob"
exit
```

继续执行输入 `exit` 或 `q`，这里下好断点的地方你可以执行任何 PHP 代码，同时还可以使用 Psysh 支持的命令，详见 [Psysh 文档](https://psysh.org/#docs)。

::: warning 注意

1. 断点位置在不开启 debug-mode 时不会有任何效果。
2. 开启 debug-mode 后，原本的终端命令输入（如 logtest 等）会被关闭。
3. 因为 Psysh 的终端与 Swoole 的一键协程化冲突，所以在以此模式启动后，[Swoole 一键协程化](https://wiki.swoole.com/#/runtime) 将临时关闭。

:::

## Console 日志调试

框架默认情况下，日志等级为 2，也就是不显示 `verbose` 和 `debug` 级别的日志。你可以临时根据启动命令修改日志等级：

```bash
php bin/start server --log-debug # 以debug最高级别显示所有输出
php bin/start server --log-verbose # 显示加载中间件、保存缓存等繁琐的日志输出
```

