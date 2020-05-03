---
sidebarDepth: 2
---

# 快速开始

## 运行框架

一切都安装好后，你可以直接将框架运行起来了！

```bash
php bin/start
```

如果看到 `=== Worker #0 已启动 ===` 字样，则表明框架一切正常：

1. 使用默认配置 `WebSocket监听地址：0.0.0.0，端口：20001` 
2. 自带示例模块加载完成
3. PHP 环境完整

## 配置 CQHTTP 插件

> 此文档段的内容均参考 [NoneBot 文档](https://nonebot.cqp.moe/)，如果转述有偏差或不理解可前往 NoneBot 文档进行阅读。

单纯运行 炸毛框架 后，如果不配置 CQHTTP 插件的话，仅仅相当于启动了一个 监听 20001 端口的WebSoket + HTTP 服务器。你可以通过浏览器访问：http://127.0.0.1:20001 ，或者你部署到了服务器后需要输入服务器地址。页面会告诉你 Nothing here，说明框架一切正常。

要连接 QQ 机器人的话，需要配置 CQHTTP 插件，与框架互通，我们要做的就是对插件做一个简单的配置来让它把消息等事件上报给 zhamao-framework。

如果你在之前已经按照 __安装__ 的建议使用默认配置运行了一次 CQHTTP 插件，此时 酷Q 的 `data/app/io.github.richardchien.coolqhttpapi/config/` 目录中应该已经有了一个名为 `<user-id>.json` 的文件（`<user-id>` 为你登录 酷Q 的 QQ 账号）。修改这个文件，修改如下内容（如果不存在相应字段则自行添加）：

::: warning 注意

如果使用 CQHTTP 插件提供的 Docker 部署的 酷Q，则配置文件所在目录可能是 `app/io.github.richardchien.coolqhttpapi/config` 。

:::

```json
{
    "ws_reverse_url": "ws://127.0.0.1:20001/",
    "use_ws_reverse": true,
  	"ws_reverse_use_universal_client": true
}
```

::: tip 提示

这里的 `127.0.0.1:20001` 对应框架运行中监听的 地址(host) 和 端口(port) ，框架默认是监听到 `0.0.0.0`，代表监听所有地址，也就是任意目标均可访问到框架的端口。

如果 框架 和 酷Q 运行在同一台机器上且监听地址为 `0.0.0.0`，则上面填写 `ws://127.0.0.1:20001` 即可。如果你的 酷Q 运行在 Docker 容器中，zhamao-framework 运行在宿主机中，默认情况下这里需要将 `127.0.0.1` 改成 `172.17.0.1` （即宿主机在 Docker 内部的 IP，但不同机器可能不同，具体请看 进阶 教程中的 Docker 章节），或者直接填写服务器的 IP 地址即可。

:::

修改之后，在 酷Q 的应用菜单中重启 CQHTTP 插件，或直接重启 酷Q，让插件加载新的配置文件。

## 与机器人对话

在配置文件编写正确后，zhamao-framework 所在的终端（如果正在运行的话）应该会输出下面的一条日志：

```
[23:13:55 INFO] 机器人 123456 已连接！
```

此时表明 CQHTTP 插件成功地连上了 炸毛框架，123456 为你登录 酷Q 的机器人 QQ 号码。

::: warning 注意

如果到这一步你没有看到上面这样的日志，请查看插件的日志文件中是否在不断尝试重连（可通过将插件的 `show_log_console` 配置项设置为 `true` 来显示日志控制台，方便调试），如果没有在不断重连，也说明连接成功.

如果框架的运行日志中没有任何连接日志，插件的日志中也在不断重连，请注意检查配置中的 IP 和端口是否确实可以访问。

:::

现在和你的机器人 QQ 私聊，或在它加入的群内发送：`你好`，它应该会回复你：`你好啊，我是由炸毛框架构建的机器人！`。

到这里如果一切都没有问题，恭喜你，你已经成功完全部署了整个框架和 QQ 机器人程序，你可以开始进入代码编写过程了！

## 守护进程运行

炸毛框架不同于传统的 php-fpm 运行方式，它像 Python 或其他 shell 程序一样通过命令行启动，所以在开发完成后如果在 ssh 中运行，断开 ssh 后程序就退出了。我们可以使用多种方式使框架持续运行，即使退出 ssh 或 tty 登录。

### 使用 Docker

如果你使用的是 Docker 部署环境的话，可以在 **安装** 章节直接给启动 Docker 的指令中加入参数 `-d` 即可守护进程运行。如果你的运行方式是主机安装，则需使用下面的这些其他方式。

### systemd 脚本生成

如果你使用的不是非常过时的 Linux 发行版，一般都会带有 **systemd**，你可以使用框架的生成脚本生成一个当前用户的用户态守护进程服务文件。

```bash
php bin/systemd --generate
```

默认生成到 `resources/zhamao.service` 这个文件下。以 Ubuntu 18.04 为例，将这个文件拷贝到 `/etc/systemd/system/` 目录下，然后执行如下命令即可使用 systemd 进行框架的守护进程管理。

```bash
# 查看状态和终端输出
sudo systemctl status zhamao.service
# 启动服务
sudo systemctl start zhamao.service
# 停止服务
sudo systemctl stop zhamao.service
```

### 一键守护进程化

如果你不想在以后一直常驻服务，而是临时变成守护进程，可以使用如下参数一键守护进程化：

```bash
php bin/start server --daemon
```

### 使用 screen / tmux

如果为了方便从终端操作框架或查看输出日志，也可以直接使用 screen 或 tmux 运行程序。

```bash
# 使用 screen
screen -R zhamao
php bin/start
# 使用 Ctrl+A, 再按 D 回到 shell
# 重新回到 screen
screen -x zhamao

# 使用 tmux
tmux new -s zhamao
php bin/start
# 使用 Ctrl+B，再按 D 回到 shell
# 重新回到 tmux
tmux attach -t zhamao
```

