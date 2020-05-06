# CQ 码

框架提供了 CQ 码的封装，你可以在任何位置使用封装好的 CQ 码类。

- 记得先 use 命名空间：`use ZM\API\CQ;`

关于 CQ 码的概念，请到 酷Q 的 [官网文档](https://docs.cqp.im/manual/cqcode/) 查看。

## CQ::at()

@ 一下 QQ 用户，或 @ 全体成员

- `$qq`: 用户的 QQ 号码或 `all`

```php
$this->reply(CQ::at(10086) . " 你今天学习了吗？");
// 效果是这个用户收到了前面带@自己的一条消息
$this->reply(CQ::at("all") . " 我是来自领导的消息，收到请回复！");
// "@全体成员 我是来自领导的消息，收到请回复！"
```

## CQ::face()

发送 QQ 原生的黄脸表情。这里是 <a href="/face_list.html" _block="true">ID 对照表</a>。

- `$id`: 表情的 id 号

```php
$this->reply(CQ::face(8)."我困了");
```

## CQ::emoji()

发送 emoji 表情。这是对应 CQ 码原生的接口，在实际发送 emoji 的时候推荐直接向文本中插入 emoji 发送。

- `$id`: 表情的 id 号

## CQ::bface()

发送原创表情，存放在 酷Q 目录的 `data/bface/` 下。

- `$id`: 表情的 id 号

## CQ::sface()

发送小表情，参数同 **CQ::bface()**。

## CQ::image()

::: warning 提示

需要 **酷Q Pro** 版本才可以发图，酷Q Air 版本只可以从 CQ 码中解析图片。

:::

发送图片。这里支持 CQHTTP 的 [增强 CQ 码](https://cqhttp.cc/docs/#/CQCode?id=增强功能列表)。

- `$file`: 图片文件地址。支持 酷Q 本地和远程地址
- `$cache`: 是否使用 CQHTTP 插件的缓存，默认为 `true`

```php
$image = 'https://zhamao.xin/file/hello.jpg'; //炸毛主页的丑图，招主页设计师
$this->reply(CQ::image($image) . "\n这是一张又大又丑的炸毛主页图片");
//发网络图片
```

## CQ::record()

::: warning 提示

需要 **酷Q Pro** 版本才可以发语音，酷Q Air 版本只可以从 CQ 码中解析语音。

:::

发送语音，这里支持 CQHTTP 的 [增强 CQ 码](https://cqhttp.cc/docs/#/CQCode?id=增强功能列表)。语音 CQ 码如果伴随着其他文字，则文字内容会被丢弃。

- `$file`: 语音文件地址，支持 酷Q 本地和远程地址
- `$magic`: 是否变声，默认为 `false`
- `$cache`: 是否使用 CQHTTP 插件的缓存，默认为 `true`

```php
$record = 'https://zhamao.xin/file/hello.mp3'; // Siri生成的Hello mp3文件
$this->reply(CQ::record($record));
```

## CQ::rps()

掷骰子。掷骰子 CQ 码如果伴随着其他文字，则文字内容会被丢弃。

```php
$this->reply(CQ::rps());
```

## CQ::dice()

发送掷骰子表情。掷骰子 CQ 码如果伴随着其他文字，则文字内容会被丢弃。

```php
$this->reply(CQ::dice());
```

## CQ::shake()

发送戳一戳（原窗口抖动，仅供好友私聊消息使用）

```php
$this->reply(CQ::shake());
```

## CQ::music()

发送音乐分享卡片。此 CQ 码如果伴随着其他文字，则文字内容会被丢弃。

- `$type`: 发送类型
- `$id_or_url`: 音乐的 id 或 音乐卡片点进去打开的链接
- `$audio`: 音频文件的 HTTP 地址
- `$title`: 音乐卡片的标题，建议 12 字以内
- `$content`: 音乐卡片的简介内容（可选）
- `$image`: 音乐卡片的图片的链接地址（可选）

如果 `$type` 参数为 `qq` 或 `163` 或 `xiami`，则必须且只和第二个参数 `$id_or_url` 配合使用。这三个为内置分享，需要先通过搜索功能获取对应平台歌曲的 id 后使用。

如果 `$type` 参数为 `custom`，则表明此音乐卡片为用户自定义，你可以根据自己的需要自定义卡片内容和音频。此时必须填写 `$id_or_url`, `$audio`, `$title` 三个参数。

```php
$this->reply(CQ::music("163", "730806")); //一首我喜欢的歌
// 以内置的发送类型发送音乐卡片，我这里挑了网易云音乐的一首歌。

$this->reply("custom", "https://baidu.com/", "https://zhamao.xin/file/hello.mp3", "我是Siri说出来的Hello", "不服来打我呀！", "https://zhamao.xin/file/hello.jpg");
// 自定义整个卡片的每个内容
```

## CQ::share()

发送链接分享的卡片。只能在单条回复中单独使用，含有其他文本消息会把消息吞掉。

- `$url`: 要分享的链接
- `$title`: 分享卡片的标题，建议 12 字以内
- `$content`: 分享卡片的内容（可选）
- `$image`: 分享卡片的展示图片的地址（可选）

```php
// 假如我想弄一个假的内容分享卡片，点进去是让他问百度
$this->reply(CQ::share("https://www.baidu.com/s?wd=怎么写出好代码", "震惊！一小编发现了神秘链接", "点击查看"));
```

## CQ::decode()

反转义 CQ 码的敏感符号。请先了解 [CQ 码特殊字符规范](https://docs.cqp.im/manual/cqcode/)。

这里做一个反向的转换：

```
&amp; -> &
&#91; -> [
&#93; -> ]
```

- `$str`: 要反转义的字符串

```php
$str = CQ::decode("&#91;我只是一条普通的文本&#93;");
// 转换为 "[我只是一条普通的文本]"
```

## CQ::encode()

> 别名：CQ::escape()

转义 CQ 码的敏感符号，防止 酷Q 把不该解析为 CQ 码的消息内容当作 CQ 码处理。

```
& -> &amp;
[ -> &#91;
] -> &#93;
```

- `$str`: 要转义的内容

```php
$str = CQ::encode("[CQ:我只是一条普通的文本]");
// $str: "&#91;CQ:我只是一条普通的文本&#93;"
```

## CQ::removeCQ()

去除字符串中所有的 CQ 码，替换为空。

- `$msg`: 要去除字符串

```php
$str = CQ::removeCQ("[CQ:at,qq=all]这是带表情的全体消息[CQ:face,id=8]");
// $str: "这是带表情的全体消息"
```

