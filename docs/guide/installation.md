# 安装

## zhamao-framework 框架

框架安装流程大致为：

1. 安装 PHP
2. 安装 Swoole、mbstring 等需要的 PHP 扩展
3. 从 Composer 拉取框架

### Linux / Win10 (WSL) 

```bash
#安装PHP >= 7.2（CLI + dev 版本）
#Debian、Ubuntu（一句话安装php和swoole）
apt-get update && apt-get install -y software-properties-common && \
  add-apt-repository ppa:ondrej/php && \
	apt-get update && \
	apt-get install php php-dev php-mbstring gcc make openssl \
		php-mbstring php-json php-curl php-mysql -y && \
	apt-get install wget composer -y && \
	wget https://github.com/swoole/swoole-src/archive/v4.5.0.tar.gz && \
	tar -zxvf v4.5.0.tar.gz && \
	cd swoole-src-4.5.0/ && \
	phpize && ./configure --enable-openssl --enable-mysqlnd && make -j2 && make install && \
	(echo "extension=swoole.so" >> $(php -i | grep "Loaded Configuration File" | awk '{print $5}'))

#CentOS(需要 >= 7) 使用的指令
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
yum makecache fast
yum install php72w-devel.x86_64 php72w-mbstring.x86_64 php72w-pear.noarch gcc gcc-c++ openssl-devel -y
# 方法1: PECL 安装 Swoole
(sudo) pecl install swoole
# 方法2: 源码编译安装 Swoole (使用最新版，把版本号替换为最新版即可)
wget https://github.com/swoole/swoole-src/archive/v4.5.0.tar.gz
tar -zxvf v4.5.0.tar.gz
cd swoole-src-4.5.0
phpize
./configure --enable-openssl
make -j2
make install
# 添加 extension 到 php.ini 文件，这行是自动找到位置并写入到最后一行的命令
echo "extension=swoole.so" >> $(php -i | grep "Loaded Configuration File" | awk '{print $5}')

#其他发行版可自行 Google 或 Bing 查询安装方法
```

下载框架

```bash
#部署框架
composer create-project zhamao/framework-starter
cd framework-starter
```

::: tip 框架需要额外安装的 PHP 扩展汇总

php-mbstring，php-json，php-ctype，php-swoole，php-curl，php-mysql（PDO 驱动的 mysqlnd）

swoole (版本 >= 4.3)

:::

::: warning 系统可能存在的问题

对于 CentOS，建议在部署框架环境或使用 Docker 前临时将 SELinux 关闭，以免造成不必要的麻烦。

对于 macOS，使用 homebrew 安装 PHP 环境要注意 openssl 安装时需要将 openssl 的环境变量临时声明才能正常使用 openssl。

对于 cygwin 的 Windows 用户，可能未来新版本的 Swoole 兼容性不高，需要注意潜在的各种问题。

在 1.3.1 版本开始，框架将连接池的驱动从 Swoole 官方客户端连接变为 PDO 连接，因为 Swoole 提供的客户端已停止维护。但更换的同时也给框架增加了 PHP 扩展的依赖，如果你选择升级到 1.3.1 以后的版本，并要使用 MySQL 连接池的话，请务必安装 mysql 扩展！

:::

## Docker 安装框架

对于不想部署到主机环境的情况，推荐直接使用 Docker。

### 框架单独的 Docker 构建

如果你已经部署了 CQHTTP 的 Docker 容器并运行，或者你有多个 酷Q 要连接到一个框架，推荐单独构建一个容器运行框架：

```bash
cd zhamao-framework/
# 构建容器
docker build -t zm .
# 直接启动
docker run --rm -it -p 20001:20001 -v $(pwd):/app/zhamao-framework zm
```

### 框架 + CQHTTP Docker 混合

如果你只有一个 酷Q，并且只是用来开发机器人，可以直接使用作者托管的二合一镜像部署，运行 Docker 后的命令需在 vnc 中右键桌面打开终端进行操作：

```bash
mkdir coolq-data zhamao-framework
chmod 777 zhamao-framework
docker run --rm -it \
	-v $(pwd)/coolq-data:/home/user/coolq \
	-v $(pwd)/zhamao-framework:/home/user/zhamao-framework \
	-p 9000:9000 \
	-e CQHTTP_WS_REVERSE_URL=ws://127.0.0.1:20001/ \
	-e CQHTTP_USE_WS_REVERSE=true \
	-e CQHTTP_WS_REVERSE_USE_UNIVERSAL_CLIENT=true \
	-e FORCE_ENV=true \
	-e VNC_PASSWD=yourpass \
	zmbot/coolq-zm

# 通过浏览器进入 http://你的地址:9000/ 进入vnc
# yourpass是登录密码，建议修改成其他的8位密码
# 下面的命令在 vnc 里面的终端输入

# 第一次安装时进入后运行一下
./start.sh

#以后启动 Docker 后运行框架的方法
cd zhamao-framework
php bin/start
```

二合一容器安装后，你的 酷Q 目录在当前目录下的 `coolq-data/`，你的框架代码目录在 `zhamao-framework/`。要注意，这两个文件夹的权限都是 `1000:1000`，如果不是可能会导致 Docker 内的程序权限不足。或者将文件夹设置为 777 权限也可以。

::: tip 提示

二合一 Docker 是基于 CQHTTP 的 Docker 容器进行构建，本 Docker 只在原 Docker 环境中配置了 Swoole 等运行框架的环境，其他关于 Docker 的问题情见 [CQHTTP - Docker](https://cqhttp.cc/docs/#/Docker)。

:::

::: warning 注意

在 Docker 中运行框架，如果提示 composer auth 问题，直接回车即可。启动后建议谨慎使用 Ctrl+C 键盘中止程序，可以输入 `stop` 命令。如果 Ctrl+C 导致没有退出并卡死，可以使用 `docker ps` + `docker stop` 两个指令找到 id 并停止容器。

:::

## 酷Q with CQHTTP 插件

你可以按照 CQHTTP 插件的推荐安装方法，从 Docker、GitHub 下载等方式安装到平台上。详见 [CQHTTP文档](https://cqhttp.cc/docs/)。如果你是第一次使用 酷Q 或 CQHTTP 插件，建议先自行完成 酷Q 的新手教程和了解 CQHTTP 的基础运作原理。

关于 CQHTTP 插件，推荐按照其 [教程](https://cqhttp.cc/docs/) 的「使用方法」安装插件。安装后，请先使用默认配置运行，并查看 酷Q 日志窗口的输出，以确定插件的加载、配置的生成和读取、插件版本等符合预期。

::: tip 提示

目前 zhamao-framework 需要至少安装 CQHTTP 插件的版本是 >= 4.12，以便使用所有功能

:::

## 使用 IDE 进行开发

通过文本编辑器进行炸毛框架开发时，框架集成的注解功能虽然便捷，但仍需要 `use` 注解相对应的命名空间，这显然不是一个高效的做法。我们推荐在使用集成开发环境 **IDEA** 或 **PhpStorm** 时，通过插件市场搜索并安装 **PHP Annotations** 插件以提供注解命名空间自动补全、注解属性代码提醒、注解类跳转等非常有助于提升开发效率的功能。

## 疑难处理

如果遇到安装方面的困难或各种因不同环境导致框架安装出现问题，可以在框架的 GitHub 页面发布 Issue，一般情况下将在 24 小时内回复。