---
sidebar: auto
---
# 更新日志

## v1.6

> 更新时间：2020.7.14

- 新增：现在可以对类修饰自定义的注解了
- 修复：数据库操作 where 对象时产生的歧义
- 新增：支持自定义任何 Swoole Server 事件的注解绑定，详见文档
- 修复：多个中间件注解对类只生效最后一个的 bug

❗ 下面是框架升级需要手动进行的变更：

- 新版本由于引进了自定义 Swoole Server 事件的机制，对 global.php 全局配置文件有了变动，需要添加以下内容才能正常启动（旧版本升级新版本用户，新用户无需操作）：

```php
/** 注册 Swoole Server 事件注解的类列表 */
$config['server_event_handler_class'] = [
    \Framework\ServerEventHandler::class, //默认不可删除，否则会不能使用框架
];
```

## v1.5.8

> 更新时间：2020.6.26

- 新增：`@CQCommand` 注解的 fullMatch 参数（全量正则表达式匹配）

## v1.5.7

> 更新时间：2020.6.20

- 新增：ZM_BREAKPOINT 的短名称：BP
- 优化：终端连接器自动重连
- 修复：语法错误时防止循环报错

## v1.5.6

> 更新时间：2020.6.15

- 新增：`@CQCommand` 注解支持 `message_type`，`user_id`，`group_id`，`discuss_id` 限定条件
- 新增：PDO 数据库支持自定义 fetch_mode，可在 `global.php` 中的 `sql_config["sql_default_fetch_mode"]` 字段设置，也可以调用时 `DB::rawQuery("语句", [], PDO::FETCH_ASSOC);` 第三个参数可选
- 🔴 废弃：`ModBase` 基类，基类继承机制将在 1.6 版本起完全删除

## v1.5.5

> 更新时间：2020.6.13

- 修复：`@SwooleEventAt("close")` 下不能使用 `ctx()->getConnection()` 获取链接对象的 bug
- 新增：init 命令，可在 `composer require zhamao/framework` 后使用 `vendor/bin/start init` 初始化项目目录结构和配置文件
- 更新：默认模块新增机器人断开连接的回调事件

## v1.5.4

> 更新时间：2020.6.13

- 新增：`@CQCommand` 下支持 alias 参数
- 更新：将 autoload 变为 composer autoload（需要重新 composer update）

## v1.5.3

> 更新时间：2020.6.10

- 修复：在 Linux 系统下 Terminal 无法正常使用的 bug

## v1.5.2

> 更新时间：2020.6.8

- 新增：`ZM_VERSION` 常量，对应为当前框架版本
- 修复：部分链接不带 `/` 会导致 ZMRequest 模块报错的 bug

## v1.5.1

> 更新时间：2020.6.5

- 新增：ZMRequest::request() 自定义构建 HTTP 请求方法
- 修复：一个不会导致崩溃的 warning 提示

## v1.5

> 更新时间：2020.6.5

- 重要变更：支持从 composer 使用框架
- 新增：数据库 Select 选择器支持 `count()` 方法
- 修复：ZMRequest 中 https 和端口的指定顺序问题
- 新增：ZMWebSocket 创建 WS 链接的轻量级客户端
- 修复：数据库异常的捕获更改为 PDOException

## v1.4

> 更新时间：2020.5.23

- 新增：自定义 motd
- 新增：debug_mode 下断点调试功能
- 新增：`@OnSave` 注解，储存自动保存的变量时事件激活
- 新增：Swoole 版本检测
- 新增：全局函数，以 `zm_` 开头的，详情见文档
- 新增：`@LoadBuffer` 注解，只加载内存不自动保存的变量
- 新增：局部静态文件服务
- 新增：mysqlnd 扩展状态检测
- 更新：将终端输入更换为多进程
- 更新：将数据库连接池变更为 Swoole 官方的连接池，需要 Swoole 版本 >= 4.4.13
- 更新：提升注解绑定的事件函数的执行效率
- 修复：上下文 `getConnection()` 的 fd 无法获取的 bug
- 修复：MySQL 长链接 gone away 自动重连的问题
- 修复：MySQL 查询构造器无 WHERE 语句时会造成的 bug
- 修复：调整各项资源初始化前后顺序

不可逆修改：你需要重新执行一次 `composer update` 或重新拉取一次 Docker Image，因为 composer 依赖发生了变化。

## v1.3.1

> 更新时间：2020.5.10

- 修复：DataProvider 下 setJsonData 新建文件夹的问题
- 优化：默认 / 页面显示 `Hello Zhamao!` 文字
- 优化：Exception 和 Fatal error 报错机制的改进
- 修复：计时器没有上下文环境，发不了 API 的 bug

❗ 下面是框架升级需要手动进行的变更：

- 更改 MySQL 客户端为原生 PDO mysqlnd，如果之前使用 Docker 启动，则需使用新的 Dockerfile 构建。如果安装在本机，需安装 php-mysql 扩展。本次更新不影响框架内的 API，不需要更改任何代码。

## v1.3.0

> 更新时间：2020.5.8

- 新增：上下文，具体更新都写到了文档里了！
- 修复：ZMRobot 的 `setPrefix()` 的严重错误
- 优化：优化部分代码
- 改动：现在你可以和任意事件的注解使用任意中间件啦，而且还支持多中间件
- 新增：CQHTTP + 酷Q + 炸毛框架 的 Dockerfile
- 新增注解：`@CQAPISend`，`@CQAPIResponse`，是 API 调用后触发的事件，具体见文档说明

## v1.2.1

> 更新时间：2020.5.2

- 新增：phar 启动模式构建脚本，你可以直接拉取 phar 运行框架了！
- 优化：优化部分代码

## v1.2

> 更新时间：2020.4.29

- 新增：systemd 生成脚本、一键 daemonize 守护进程方式常驻后台
- 新增：示例模块的注释
- 重构：Console 模块，现在有准确的控制台输出分级功能了
- 新增：`@OnTick` 注解，用于绑定定时器（毫秒级）
- 新增：`ZMRobot` 类，比调用 `CQAPI` 类发送 API 更方便，同时兼容最新版本的 `CQHTTP` 插件
- 优化：使用键盘中断 `Ctrl+C`，不会丢失未保存的缓存数据了
- 优化：完善上下文对象的方法
- 新增：终端命令：`logtest`，测试输出的 log 类型

:exclamation:下面是框架模块开发中需要注意的或有不兼容的修改内容：

- 修改：`global.php` 中原来的 `info_level` 默认数值需要改为 `2`，保证终端输出和原来一致

## v1.1.2

> 更新时间：2020.4.26

- 新增：静态文件服务器
- 修复：`/` 路径的 Mapping 无法正常绑定的 bug

## v1.1.1

> 更新时间：2020.4.26

- 新增：中间件对类的修饰
- 新增：上下文对象对 IDE 的支持
- 修复：数据库插入查询的愚蠢错误
- 修复：数据库查询的 `value()` 不支持指定参数的 bug

## v1.1.0

> 更新时间：2020.3.29

- 新增：中间件 `@Middleware` 功能
- 修复：Websocket 链接关闭后未自动删除连接对象的bug

## v1.0.0

> 更新时间：2020.3.19

正式版发布。

