# 安装

## zhamao-framework 框架

框架安装流程大致为：

1. 安装 PHP
2. 安装 Swoole、mbstring 等需要的 PHP 扩展
3. 从 GitHub 拉取框架
4. Composer 更新依赖

### Linux / Win10 (WSL) 

```bash
#安装PHP >= 7.2（CLI + dev 版本）
#Debian、Ubuntu
apt-get install software-properties-common
add-apt-repository ppa:ondrej/php
apt-get update
apt-get install \
	php7.2 \
	php7.2-dev \
	php7.2-mbstring \
	php7.2-json \
	php7.2 \
	php-pear

#CentOS(需要 >= 7) 使用的指令
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
yum makecache fast
yum install php72w-devel.x86_64 php72w-mbstring.x86_64 php72w-pear.noarch gcc gcc-c++ openssl-devel -y

#其他发行版可自行 Google 或 Bing 查询安装方法
```

```bash
#安装Composer (Debian/Ubuntu)
apt-get install composer
```



```bash
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

# 安装Swoole时，如果提示你选择是否支持 ssl/mysqlnd，这两个建议选择yes。
```

```bash
#部署框架
git clone https://github.com/zhamao-robot/zhamao-framework.git
#拉取依赖
composer update
```

::: tip 框架需要额外安装的 PHP 扩展汇总

php-mbstring，php-json，php-ctype，php-swoole，php-curl

:::

## Docker 安装框架

```bash
cd zhamao-framework/
# 构建容器
docker build -t zm .
# 直接启动
docker run --rm -it -p 20001:20001 -v $(pwd):/app/zhamao-framework zm
```

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