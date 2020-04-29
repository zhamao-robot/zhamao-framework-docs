# CQ 码

框架提供了 CQ 码的封装，你可以在任何位置使用封装好的 CQ 码类。

- 命名空间：`use ZM\API\CQ;`

```php
$this->reply(CQ::image("a.jpg"));
//执行后CQ::image被替换为字符串："[CQ:image,file=a.jpg]"
```

返回 CQ 码，支持 CQHTTP 插件提供的 [增强特性](https://cqhttp.cc/docs/#/CQCode?id=增强功能列表)。

```php
//$file 为图片文件名，支持增强特性
//$cache 为是否缓存，默认为否
CQ::image($file, $cache = false);
```

