---
sidebarDepth: 3
---

# ZMRobot

ZMRobot 类是封装好的 **CQHTTP API**，可以在任意位置直接使用此对象进行 API 推送。

- 命名空间：`\ZM\Utils\ZMRobot`

::: tip 提示

因为 CQHTTP 插件也会有升级和变动，而框架始终会和最新版本的 CQHTTP 保持一致，所以如果你在使用旧版 CQHTTP 插件时，可能会无法调用。具体接口请看 CQHTTP 的[更新发布](https://github.com/richardchien/coolq-http-api/releases)。

:::

## 使用 ZMRobot 对象

```php
$obj = ZMRobot::get("机器人QQ号");
$obj = new ZMRobot($conn); //$conn 为 CQConnection 机器人的 WS 链接对象
$obj = ZMRobot::getRandom(); //从已连接的机器人中随机选一个机器人返回
```

## 对象属性方法

对象属性方法是对 API 的调整，例如是否以 `_async`、`_rate_limited` 后缀发送 API、设置协程返回还是异步返回结果等。

### ZMRobot::API_NORMAL

以默认（无后缀）方式请求 API。

### ZMRobot::API_ASYNC

以后缀 `_async` 方式异步请求 API。

### ZMRobot::API_RATE_LIMITED

以后缀 `_rate_limited` 方式请求 API。

### setPrefix()

设置后缀。目前支持 `_async`、`_rate_limited`。

- **prefix**: `int` `默认:API_NORMAL`，可选 `ZMRobot::API_NORMAL`、`ZMRobot::API_ASYNC`、`ZMRobot::API_RATE_LIMITED`

设置后缀后，请求的 API 会发生变化。例如发送私聊消息：`sendPrivateMsg()`，请求的 API 为 `send_private_msg_async`，具体可参考 [CQHTTP 文档 - API](https://cqhttp.cc/docs/#/API)。

### setCallback()

设置 API 结果返回方式。

1. 如果直接调用 API，不执行此方法，则返回值为 **此 API 的 Websocket是否发送成功** 的布尔值。
2. 此方法的唯一一个参数 **callback** 默认为 `true`。当设置为 `true` 时，在调用 API 后会协程等待 CQHTTP 返回结果。协程等待期间不影响其他框架事件的处理。返回结果为 API 整个包的对象，类型是数组。
3. 如果传入的参数是匿名函数，则 API 调用函数返回解释同 **1**。在返回后会异步调用匿名函数。参数依次为 `function(array $response, array $data)`。参数列表见本节的 `response`表和 `data` 表。

#### response 表

| 字段名    | 数据类型 | 默认值     | 说明                    |
| --------- | -------- | ---------- | ----------------------- |
| `status`  | String   | "ok"       | 对方 QQ 号              |
| `retcode` | number   | 0          | 返回状态码              |
| `data`    | array    | 见 data 表 | 根据不同的 API 返回不同 |

#### data 表

data 表不是表，它对应的下方所有 API 返回的参数列表。不同 API 返回不同。

## HTTP API 相关方法

下面是对 CQHTTP 插件的方法进行封装的函数参数解释和返回类型。本节内容完全由 CQHTTP 插件的 [API 描述](https://cqhttp.cc/docs/#/API) 翻译而来，你可以直接参考原文档。

### sendPrivateMsg()

#### 参数

| 字段名        | 数据类型 | 默认值  | 说明                                                         |
| ------------- | -------- | ------- | ------------------------------------------------------------ |
| `user_id`     | number   | -       | 对方 QQ 号                                                   |
| `message`     | message  | -       | 要发送的内容                                                 |
| `auto_escape` | boolean  | `false` | 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 `message` 字段是字符串时有效 |

#### 响应数据

| 字段名       | 数据类型       | 说明    |
| ------------ | -------------- | ------- |
| `message_id` | number (int32) | 消息 ID |

### sendGroupMsg()

发送群组消息。

#### 参数

| 字段名        | 数据类型 | 默认值  | 说明                                                         |
| ------------- | -------- | ------- | ------------------------------------------------------------ |
| `group_id`    | number   | -       | 群号                                                         |
| `message`     | message  | -       | 要发送的内容                                                 |
| `auto_escape` | boolean  | `false` | 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 `message` 字段是字符串时有效 |

#### 响应数据

| 字段名       | 数据类型       | 说明    |
| ------------ | -------------- | ------- |
| `message_id` | number (int32) | 消息 ID |

### sendDiscussMsg()

发送讨论组消息。

#### 参数

| 字段名        | 数据类型 | 默认值  | 说明                                                         |
| ------------- | -------- | ------- | ------------------------------------------------------------ |
| `discuss_id`  | number   | -       | 讨论组 ID（正常情况下看不到，需要从讨论组消息上报的数据中获得） |
| `message`     | message  | -       | 要发送的内容                                                 |
| `auto_escape` | boolean  | `false` | 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 `message` 字段是字符串时有效 |

#### 响应数据

| 字段名       | 数据类型       | 说明    |
| ------------ | -------------- | ------- |
| `message_id` | number (int32) | 消息 ID |

### sendMsg()

发送消息。

#### 参数

| 字段名         | 数据类型 | 默认值  | 说明                                                         |
| -------------- | -------- | ------- | ------------------------------------------------------------ |
| `message_type` | string   | -       | 消息类型，支持 `private`、`group`、`discuss`，分别对应私聊、群组、讨论组，如不传入，则根据传入的 `*_id` 参数判断 |
| `target_id`    | number   | -       | 目标号码，如 QQ 号，群号，讨论组号                           |
| `message`      | message  | -       | 要发送的内容                                                 |
| `auto_escape`  | boolean  | `false` | 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 `message` 字段是字符串时有效 |

#### 响应数据

| 字段名       | 数据类型       | 说明    |
| ------------ | -------------- | ------- |
| `message_id` | number (int32) | 消息 ID |

### deleteMsg()

撤回消息。

#### 参数

| 字段名       | 数据类型       | 默认值 | 说明    |
| ------------ | -------------- | ------ | ------- |
| `message_id` | number (int32) | -      | 消息 ID |

#### 响应数据

无

### sendLike()

发送好友赞。

#### 参数

| 字段名    | 数据类型 | 默认值 | 说明                             |
| --------- | -------- | ------ | -------------------------------- |
| `user_id` | number   | -      | 对方 QQ 号                       |
| `times`   | number   | 1      | 赞的次数，每个好友每天最多 10 次 |

#### 响应数据

无

### setGroupKick()

群组踢人。

#### 参数

| 字段名               | 数据类型 | 默认值  | 说明               |
| -------------------- | -------- | ------- | ------------------ |
| `group_id`           | number   | -       | 群号               |
| `user_id`            | number   | -       | 要踢的 QQ 号       |
| `reject_add_request` | boolean  | `false` | 拒绝此人的加群请求 |

#### 响应数据

无

### setGroupBan()

群组单人禁言。

#### 参数

| 字段名     | 数据类型 | 默认值    | 说明                             |
| ---------- | -------- | --------- | -------------------------------- |
| `group_id` | number   | -         | 群号                             |
| `user_id`  | number   | -         | 要禁言的 QQ 号                   |
| `duration` | number   | `30 * 60` | 禁言时长，单位秒，0 表示取消禁言 |

#### 响应数据

无

### setGroupAnonymousBan()

群组匿名用户禁言

#### 参数

| 字段名              | 数据类型         | 默认值    | 说明                                                         |
| ------------------- | ---------------- | --------- | ------------------------------------------------------------ |
| `group_id`          | number           | -         | 群号                                                         |
| `anonymous_or_flag` | object 或 string | -         | 要禁言的匿名用户对象（群消息上报的 `anonymous` 字段）或用户的 flag |
| `duration`          | number           | `30 * 60` | 禁言时长，单位秒，无法取消匿名用户禁言                       |

上面的 `anonymous_or_flag` 两者任选其一传入即可。

#### 响应数据

无

### setGroupWholeBan()

群组全员禁言

#### 参数

| 字段名     | 数据类型 | 默认值 | 说明     |
| ---------- | -------- | ------ | -------- |
| `group_id` | number   | -      | 群号     |
| `enable`   | boolean  | `true` | 是否禁言 |

#### 响应数据

无

### setGroupAdmin()

群组设置管理员

#### 参数

| 字段名     | 数据类型 | 默认值 | 说明                      |
| ---------- | -------- | ------ | ------------------------- |
| `group_id` | number   | -      | 群号                      |
| `user_id`  | number   | -      | 要设置管理员的 QQ 号      |
| `enable`   | boolean  | `true` | true 为设置，false 为取消 |

#### 响应数据

无

### setGroupAnonymous()

群组匿名

#### 参数

| 字段名     | 数据类型 | 默认值 | 说明             |
| ---------- | -------- | ------ | ---------------- |
| `group_id` | number   | -      | 群号             |
| `enable`   | boolean  | `true` | 是否允许匿名聊天 |

#### 响应数据

无

### setGroupCard()

设置群名片（群备注）

#### 参数

| 字段名     | 数据类型 | 默认值 | 说明                                     |
| ---------- | -------- | ------ | ---------------------------------------- |
| `group_id` | number   | -      | 群号                                     |
| `user_id`  | number   | -      | 要设置的 QQ 号                           |
| `card`     | string   | 空     | 群名片内容，不填或空字符串表示删除群名片 |

#### 响应数据

无

### setGroupLeave()

退出群组

#### 参数

| 字段名       | 数据类型 | 默认值  | 说明                                                     |
| ------------ | -------- | ------- | -------------------------------------------------------- |
| `group_id`   | number   | -       | 群号                                                     |
| `is_dismiss` | boolean  | `false` | 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散 |

#### 响应数据

无

### setGroupSpecialTitle()

设置群组专属头衔

#### 参数

| 字段名          | 数据类型 | 默认值 | 说明                                                         |
| --------------- | -------- | ------ | ------------------------------------------------------------ |
| `group_id`      | number   | -      | 群号                                                         |
| `user_id`       | number   | -      | 要设置的 QQ 号                                               |
| `special_title` | string   | 空     | 专属头衔，不填或空字符串表示删除专属头衔                     |
| `duration`      | number   | `-1`   | 专属头衔有效期，单位秒，-1 表示永久，不过此项似乎没有效果，可能是只有某些特殊的时间长度有效，有待测试 |

#### 响应数据

无

### setDiscussLeave()

退出讨论组

#### 参数

| 字段名       | 数据类型 | 默认值 | 说明                                                         |
| ------------ | -------- | ------ | ------------------------------------------------------------ |
| `discuss_id` | number   | -      | 讨论组 ID（正常情况下看不到，需要从讨论组消息上报的数据中获得） |

#### 响应数据

无

### setFriendAddRequest()

处理加好友请求

#### 参数

| 字段名    | 数据类型 | 默认值 | 说明                                      |
| --------- | -------- | ------ | ----------------------------------------- |
| `flag`    | string   | -      | 加好友请求的 flag（需从上报的数据中获得） |
| `approve` | boolean  | `true` | 是否同意请求                              |
| `remark`  | string   | 空     | 添加后的好友备注（仅在同意时有效）        |

#### 响应数据

无

### setGroupAddRequest()

处理加群请求 / 邀请

#### 参数

| 字段名     | 数据类型 | 默认值 | 说明                                                         |
| ---------- | -------- | ------ | ------------------------------------------------------------ |
| `flag`     | string   | -      | 加群请求的 flag（需从上报的数据中获得）                      |
| `sub_type` | string   | -      | `add` 或 `invite`，请求类型（需要和上报消息中的 `sub_type` 字段相符） |
| `approve`  | boolean  | `true` | 是否同意请求／邀请                                           |
| `reason`   | string   | 空     | 拒绝理由（仅在拒绝时有效）                                   |

#### 响应数据

无

### getLoginInfo()

获取登录号信息

#### 参数

无

#### 响应数据

| 字段名     | 数据类型       | 说明    |
| ---------- | -------------- | ------- |
| `user_id`  | number (int64) | QQ 号   |
| `nickname` | string         | QQ 昵称 |

### getStrangerInfo()

获取陌生人信息

#### 参数

| 字段名     | 数据类型 | 默认值  | 说明                                                 |
| ---------- | -------- | ------- | ---------------------------------------------------- |
| `user_id`  | number   | -       | QQ 号                                                |
| `no_cache` | boolean  | `false` | 是否不使用缓存（使用缓存可能更新不及时，但响应更快） |

#### 响应数据

| 字段名     | 数据类型       | 说明                                  |
| ---------- | -------------- | ------------------------------------- |
| `user_id`  | number (int64) | QQ 号                                 |
| `nickname` | string         | 昵称                                  |
| `sex`      | string         | 性别，`male` 或 `female` 或 `unknown` |
| `age`      | number (int32) | 年龄                                  |

### getFriendList()

获取好友列表

#### 参数

无

#### 响应数据

响应内容为 JSON 数组，每个元素如下：

| 字段名     | 数据类型       | 说明   |
| ---------- | -------------- | ------ |
| `user_id`  | number (int64) | QQ 号  |
| `nickname` | string         | 昵称   |
| `remark`   | string         | 备注名 |

### getGroupList()

获取群列表

#### 参数

无

#### 响应数据

响应内容为 JSON 数组，每个元素如下：

| 字段名       | 数据类型       | 说明   |
| ------------ | -------------- | ------ |
| `group_id`   | number (int64) | 群号   |
| `group_name` | string         | 群名称 |

### getGroupInfo()

获取群信息

#### 参数

| 字段名     | 数据类型 | 默认值  | 说明                                                 |
| ---------- | -------- | ------- | ---------------------------------------------------- |
| `group_id` | number   | -       | 群号                                                 |
| `no_cache` | boolean  | `false` | 是否不使用缓存（使用缓存可能更新不及时，但响应更快） |

#### 响应数据

| 字段名             | 数据类型       | 说明                 |
| ------------------ | -------------- | -------------------- |
| `group_id`         | number (int64) | 群号                 |
| `group_name`       | string         | 群名称               |
| `member_count`     | number (int32) | 成员数               |
| `max_member_count` | number (int32) | 最大成员数（群容量） |

### getGroupMemberInfo()

获取群成员信息

#### 参数

| 字段名     | 数据类型 | 默认值  | 说明                                                 |
| ---------- | -------- | ------- | ---------------------------------------------------- |
| `group_id` | number   | -       | 群号                                                 |
| `user_id`  | number   | -       | QQ 号                                                |
| `no_cache` | boolean  | `false` | 是否不使用缓存（使用缓存可能更新不及时，但响应更快） |

#### 响应数据

| 字段名              | 数据类型       | 说明                                  |
| ------------------- | -------------- | ------------------------------------- |
| `group_id`          | number (int64) | 群号                                  |
| `user_id`           | number (int64) | QQ 号                                 |
| `nickname`          | string         | 昵称                                  |
| `card`              | string         | 群名片／备注                          |
| `sex`               | string         | 性别，`male` 或 `female` 或 `unknown` |
| `age`               | number (int32) | 年龄                                  |
| `area`              | string         | 地区                                  |
| `join_time`         | number (int32) | 加群时间戳                            |
| `last_sent_time`    | number (int32) | 最后发言时间戳                        |
| `level`             | string         | 成员等级                              |
| `role`              | string         | 角色，`owner` 或 `admin` 或 `member`  |
| `unfriendly`        | boolean        | 是否不良记录成员                      |
| `title`             | string         | 专属头衔                              |
| `title_expire_time` | number (int32) | 专属头衔过期时间戳                    |
| `card_changeable`   | boolean        | 是否允许修改群名片                    |

### getGroupMemberList()

获取群成员列表

#### 参数

| 字段名     | 数据类型 | 默认值 | 说明 |
| ---------- | -------- | ------ | ---- |
| `group_id` | number   | -      | 群号 |

#### 响应数据

响应内容为 JSON 数组，每个元素的内容和上面的 `/get_group_member_info` 接口相同，但对于同一个群组的同一个成员，获取列表时和获取单独的成员信息时，某些字段可能有所不同，例如 `area`、`title` 等字段在获取列表时无法获得，具体应以单独的成员信息为准。

### getCookies()

获取 Cookies

#### 参数

| 字段名   | 数据类型 | 默认值 | 说明                    |
| -------- | -------- | ------ | ----------------------- |
| `domain` | string   | 空     | 需要获取 cookies 的域名 |

#### 响应数据

| 字段名    | 数据类型 | 说明    |
| --------- | -------- | ------- |
| `cookies` | string   | Cookies |

### getCsrfToken()

获取 CSRF Token

#### 参数

无

#### 响应数据

| 字段名  | 数据类型       | 说明       |
| ------- | -------------- | ---------- |
| `token` | number (int32) | CSRF Token |

### getCredentials()

获取 QQ 相关接口凭证，即上面两个合并。

#### 参数

| 字段名   | 数据类型 | 默认值 | 说明                    |
| -------- | -------- | ------ | ----------------------- |
| `domain` | string   | 空     | 需要获取 cookies 的域名 |

#### 响应数据

| 字段名       | 数据类型       | 说明       |
| ------------ | -------------- | ---------- |
| `cookies`    | string         | Cookies    |
| `csrf_token` | number (int32) | CSRF Token |

### getRecord()

获取语音。其实并不是真的获取语音，而是转换语音到指定的格式，然后返回语音所在 **酷Q** 目录的文件名（`data\record` 目录下）。**注意，要使用此接口，需要给 酷Q 安装 酷Q 的 [语音组件](https://cqp.cc/t/21132)。**

#### 参数

| 字段名       | 数据类型 | 默认值  | 说明                                                         |
| ------------ | -------- | ------- | ------------------------------------------------------------ |
| `file`       | string   | -       | 收到的语音文件名（CQ 码的 `file` 参数），如 `0B38145AA44505000B38145AA4450500.silk` |
| `out_format` | string   | -       | 要转换到的格式，目前支持 `mp3`、`amr`、`wma`、`m4a`、`spx`、`ogg`、`wav`、`flac` |
| `full_path`  | boolean  | `false` | 是否返回文件的绝对路径（Windows 环境下建议使用，Docker 中不建议） |

#### 响应数据

| 字段名 | 数据类型 | 说明                                                         |
| ------ | -------- | ------------------------------------------------------------ |
| `file` | string   | 转换后的语音文件名或路径，如 `0B38145AA44505000B38145AA4450500.mp3`，如果开启了 `full_path`，则如 `C:\Apps\CoolQ\data\record\0B38145AA44505000B38145AA4450500.mp3` |

### getImage()

获取图片。

#### 参数

| 字段名 | 数据类型 | 默认值 | 说明                                                         |
| ------ | -------- | ------ | ------------------------------------------------------------ |
| `file` | string   | -      | 收到的图片文件名（CQ 码的 `file` 参数），如 `6B4DE3DFD1BD271E3297859D41C530F5.jpg` |

#### 响应数据

| 字段名 | 数据类型 | 说明                                                         |
| ------ | -------- | ------------------------------------------------------------ |
| `file` | string   | 下载后的图片文件路径，如 `C:\Apps\CoolQ\data\image\6B4DE3DFD1BD271E3297859D41C530F5.jpg` |

### canSendImage()

检查是否可以发送图片。

#### 响应数据

| 字段名 | 数据类型 | 说明   |
| ------ | -------- | ------ |
| `yes`  | boolean  | 是或否 |

### canSendRecord()

检查是否可以发送语音，返回同上。

### getStatus()

获取插件运行状态。

#### 响应数据

| 字段名            | 数据类型 | 说明                                                         |
| ----------------- | -------- | ------------------------------------------------------------ |
| `app_initialized` | boolean  | CQHTTP 插件已初始化                                          |
| `app_enabled`     | boolean  | CQHTTP 插件已启用                                            |
| `plugins_good`    | object   | CQHTTP 的各内部插件是否正常运行                              |
| `app_good`        | boolean  | CQHTTP 插件正常运行（已初始化、已启用、各内部插件正常运行）  |
| `online`          | boolean  | 当前 QQ 在线，`null` 表示无法查询到在线状态                  |
| `good`            | boolean  | CQHTTP 插件状态符合预期，意味着插件已初始化，内部插件都在正常运行，且 QQ 在线 |

通常情况下建议只使用 `online` 和 `good` 这两个字段来判断运行状态，因为随着插件的更新，其它字段有可能频繁变化。

其中，`online` 字段的在线状态检测有两种方式，可通过 `online_status_detection_method` 配置项切换，默认通过读取 酷Q 日志数据库实现，可切换为 `get_stranger_info` 以通过测试陌生人查询接口的可用性来检测。具体区别如下：

| 在线检测方式                | 优点                                                         | 缺点                                                         |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `get_stranger_info`（默认） | 正常情况下比 `log_db` 准确，但请求频率过高时可能变得不准确（在线被认为不在线）；需要发送网络请求 | （几乎不可能）会因为 酷Q 更新而失效                          |
| `log_db`                    | 查询速度较快；无需网络请求（不会触发腾讯风控）；不会因为请求频率过高而不准确 | 可能因为 酷Q 修改数据库表名、文件名而失效；月尾掉线，月初无法检测到 |

### getVersionInfo()

获取 酷Q 及 CQHTTP 插件的版本信息

#### 响应数据

| 字段名                       | 数据类型 | 说明                                      |
| ---------------------------- | -------- | ----------------------------------------- |
| `coolq_directory`            | string   | 酷Q 根目录路径                            |
| `coolq_edition`              | string   | 酷Q 版本，`air` 或 `pro`                  |
| `plugin_version`             | string   | CQHTTP 插件版本，例如 `2.1.3`             |
| `plugin_build_number`        | number   | CQHTTP 插件 build 号                      |
| `plugin_build_configuration` | string   | CQHTTP 插件编译配置，`debug` 或 `release` |

### setRestartPlugin()

重启 CQHTTP 插件

由于重启插件同时需要重启 API 服务，这意味着当前的 API 请求会被中断，因此需在异步地重启插件，接口返回的 `status` 是 `async`。

#### 参数

| 字段名  | 数据类型 | 默认值 | 说明                                                         |
| ------- | -------- | ------ | ------------------------------------------------------------ |
| `delay` | number   | `0`    | 要延迟的毫秒数，如果默认情况下无法重启，可以尝试设置延迟为 2000 左右 |

#### 响应数据

无

### cleanDataDir()

清理 酷Q 的数据目录，用于清理积攒了太多旧文件的数据目录，如 `image`。

#### 参数

| 字段名     | 数据类型 | 默认值 | 说明                                                      |
| ---------- | -------- | ------ | --------------------------------------------------------- |
| `data_dir` | string   | -      | 收到清理的目录名，支持 `image`、`record`、`show`、`bface` |

#### 响应数据

无

### cleanPluginLog()

清理插件日志，用于清空 CQHTTP 插件的日志文件。无参数，无响应数据。

## 试验性 HTTP API 方法

::: tip 提示

因为试验性 API 在不同的 CQHTTP 插件版本中变化较大，框架可能会落后于插件本身的更新，如非必要，请谨慎使用这些接口。

这些接口在 CQHTTP 插件中以 `_` 开头，但在框架中调用为了归类和符合命名，不需要开头的 `_`。

:::

使用方式很简单，从 ZMRobot 对象中获取 **ZMRobotExperiment** 对象即可。

```php
$exp = ZMRobot::get("机器人QQ")->getExperimentAPI(); //获取对象
$exp->getGroupInfo("123456"); //使用API
```

 ### getFriendList()

获取好友列表。这里的这个 API 是旧版本遗留的获取好友列表 API，不稳定，不推荐使用。

### getGroupInfo()

获取群信息

#### 参数

| 字段名     | 数据类型 | 默认值 | 说明         |
| ---------- | -------- | ------ | ------------ |
| `group_id` | number   | -      | 要查询的群号 |

#### 响应数据

| 字段名             | 数据类型 | 说明                                   |
| ------------------ | -------- | -------------------------------------- |
| `group_id`         | number   | 群号                                   |
| `group_name`       | string   | 群名称                                 |
| `create_time`      | number   | 创建时间                               |
| `category`         | number   | 群分类，具体这个 ID 对应的名称暂时没有 |
| `member_count`     | number   | 成员数                                 |
| `max_member_count` | number   | 最大成员数（群容量）                   |
| `introduction`     | string   | 群介绍                                 |
| `admins`           | array    | 群主和管理员列表                       |
| `admin_count`      | number   | 群主和管理员数                         |
| `max_admin_count`  | number   | 最大群主和管理员数                     |
| `owner_id`         | number   | 群主 QQ 号                             |

其中，`admins` 中每一项是一个 JSON 对象，如下：

| 字段名     | 数据类型 | 说明                                       |
| ---------- | -------- | ------------------------------------------ |
| `user_id`  | number   | QQ 号                                      |
| `nickname` | string   | 昵称                                       |
| `role`     | string   | 角色，`owner` 表示群主、`admin` 表示管理员 |

注意，和其它接口有所不同，这里的所有字段都有可能在返回数据中不存在，例如可能缺少 `max_member_count` 等，在使用时请注意异常处理。

### getVipInfo()

获取会员信息

#### 参数

| 字段名    | 数据类型 | 默认值 | 说明           |
| --------- | -------- | ------ | -------------- |
| `user_id` | number   | -      | 要查询的 QQ 号 |

#### 响应数据

| 字段名             | 数据类型 | 说明         |
| ------------------ | -------- | ------------ |
| `user_id`          | number   | QQ 号        |
| `nickname`         | string   | 昵称         |
| `level`            | number   | QQ 等级      |
| `level_speed`      | number   | 等级加速度   |
| `vip_level`        | number   | 会员等级     |
| `vip_growth_speed` | number   | 会员成长速度 |
| `vip_growth_total` | string   | 会员成长总值 |

### getGroupNotice()

获取群公告

#### 参数

| 字段名     | 数据类型 | 默认值 | 说明 |
| ---------- | -------- | ------ | ---- |
| `group_id` | number   | -      | 群号 |

#### 响应数据

包含历史公告的数组，示例如下：

```json
[
    {
        "cn": 0,
        "fid": "3b130f28000000006ef0a95cef090f00",
        "fn": 0,
        "msg": {
            "text": "喵~&nbsp;喵~",
            "text_face": "喵~&nbsp;&nbsp;喵~",
            "title": "喵喵喵"
        },
        "pubt": 1554641006,
        "read_num": 1,
        "settings": {
            "is_show_edit_card": 0,
            "remind_ts": 0
        },
        "u": 3281334718,
        "vn": 0
    }
]
```

这里的数据是 QQ 接口返回的原始数据，其中，`text` 和 `title` 等字段的内容被进行了 HTML 转义（如 `&nbsp;`）；除此之外，还可能会存在一些特殊二进制值，用于表示特殊内容，具体含义可能需要自行理解。

### sendGroupNotice()

发布群公告

#### 参数

| 字段名     | 数据类型 | 默认值 | 说明 |
| ---------- | -------- | ------ | ---- |
| `group_id` | number   | -      | 群号 |
| `title`    | string   | -      | 标题 |
| `content`  | string   | -      | 内容 |

#### 响应数据

无

### setRestart()

重启 酷Q，并以当前登录号自动登录（需勾选快速登录）

**由于强行退出可能导致 酷Q 数据库损坏而影响功能，此接口除非必要请尽量避免使用。**

#### 参数

| 字段名        | 数据类型 | 默认值  | 说明                                              |
| ------------- | -------- | ------- | ------------------------------------------------- |
| `clean_log`   | boolean  | `false` | 是否在重启时清空 酷Q 的日志数据库（`log*.db`）    |
| `clean_cache` | boolean  | `false` | 是否在重启时清空 酷Q 的缓存数据库（`cache.db`）   |
| `clean_event` | boolean  | `false` | 是否在重启时清空 酷Q 的事件数据库（`eventv2.db`） |

#### 响应数据

无

****



