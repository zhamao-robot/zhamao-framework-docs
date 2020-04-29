# ZMBuf 缓存类

因为炸毛框架是基于 cli 的常驻内存运行方式，你可以将文件、数据库、需要频繁读写的变量读到内存中使用，并设置定时保存以防丢失。

框架提供了一个 `ZMBuf` 类，此类管理了框架所有保存到内存中的全局变量，在模块中你可以调用以下方法进行操作。

`ZMBuf` 类的命名空间在：`Framework\ZMBuf`，使用前需先 use 或 IDE 写代码时自动生成。

## ZMBuf::get()

- 用途：获取一个变量。
- 参数：`$name`，变量名称。
- 返回：`mixed`，取决于你 set 的数据。当变量不存在时，返回 `null`。

## ZMBuf::set()

- 用途：设置一个变量。
- 参数：`$name`，`$value`。
- 示例：`ZMBuf::set("current_time", date("H:i:s"));`

## ZMBuf::append()

- 用途：同 `set`，效果不同的是，`$name` 变量名字的缓存为数组，这个方法将数据追加到数组尾部。
- 参数：`$name`，`$value`。

## ZMBuf::unsetCache()

- 用途：删除缓存内容。
- 参数：`$name`

## ZMBuf::globals()

- 用途：获取全局配置文件 `global.php`。
- 参数：`$key`，配置文件的属性名。
- 示例：`ZMBuf::globals("sql_config");`

## ZMBuf::$atomics

- 通途：储存框架启动时初始化的原子计数器
- 类型：数组，键名为计数器名称，键值为计数器对象 `\Swoole\Atomic`

> 剩余的一些方法在一般用户编写代码过程中用不到，故文档暂时不列出，框架内写了一些简单的注释可供参考。