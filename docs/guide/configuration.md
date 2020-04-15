# 配置文件

框架的全局配置文件在 `config/global.php` 文件中。下面是配置文件的各个选项，请根据自己的需要自行配置。

框架的配置文件是一个由 `$config` 的全局数组变量进行管理的。

| 配置名称                 | 说明                                             | 默认值                       |
| :----------------------- | ------------------------------------------------ | ---------------------------- |
| `host`                   | 框架监听的地址                                   | 0.0.0.0                      |
| `port`                   | 框架监听的端口                                   | 20001                        |
| `http_reverse_link`      | 框架开到公网或外部的 HTTP 反代链接               | 见配置文件                   |
| `zm_data`                | 框架的配置文件、日志文件等文件目录               | `./` 下的 `zm_data/`         |
| `config_dir`             | 存放各个模块配置文件的目录                       | `zm_data` 下的 `coonfig/`    |
| `crash_dir`              | 存放崩溃和运行日志的目录                         | `zm_data` 下的 `crash/`      |
| `swoole`                 | 对应 Swoole server 中 set 的参数，参考Swoole文档 | 见子表 `swoole`              |
| `sql_config`             | MySQL 数据库连接信息                             | 见子表 `sql_config`          |
| `access_token`           | CQHTTP 连接约定的token，留空则无                 | 空                           |
| `http_header`            | HTTP 请求自定义返回的header                      | 见配置文件                   |
| `http_default_code_page` | HTTP服务器在指定状态码下回复的默认页面           | 见配置文件                   |
| `init_atomics`           | 框架启动时初始化的原子计数器列表                 | 见配置文件                   |
| `auto_save_interval`     | DataProvider 提供的缓存自动保存间隔(秒)          | 900                          |
| `context_class`          | 上下文所定义的类，待上下文完善后见对应文档       | `\ZM\Context\Context::class` |

### 子表 **swoole**

| 配置名称          | 说明                                                         | 默认值                              |
| ----------------- | ------------------------------------------------------------ | ----------------------------------- |
| `log_file`        | Swoole 的日志文件                                            | `crash_dir` 下的 `swoole_error.log` |
| `worker_num`      | Worker 进程数(不推荐修改)                                    | 1                                   |
| `dispatch_mode`   | 数据包分发策略，见 [文档](https://wiki.swoole.com/#/server/setting?id=dispatch_mode) | 2                                   |
| `task_worker_num` | Task工作进程的数量                                           | 0                                   |



### 子表 **sql_config**

| 配置名称           | 说明                                | 默认值            |
| ------------------ | ----------------------------------- | ----------------- |
| `sql_host`         | 数据库地址(留空则不使用数据库)      | 空                |
| `sql_port`         | 数据库端口                          | 3306              |
| `sql_username`     | 连接数据库的用户名                  |                   |
| `sql_database`     | 要连接的数据库名                    |                   |
| `sql_password`     | 数据库连接密码                      |                   |
| `sql_enable_cache` | 开启查询器缓存，详见 [数据库缓存]() | true              |
| `sql_reset_cache`  | 数据库缓存释放时间(格式：md)        | 0300（凌晨3点整） |

