# ZMRequest HTTP 客户端

框架提供了轻量的 HTTP 请求发起工具类，直接静态调用即可。

类位置：`ZM\Utils\ZMRequest`

## ZMRequest::get()

使用 Swoole 协程客户端发起一次 GET 请求

参数：

- `$url`：请求的链接，自动解析端口、HTTPS、DNS等操作（支持 HTTPS 需要在 Swoole 安装时 `enable openssl support`）
- `$headers`：可选参数，`array` 类型，请求头数组。例如 `["Content-Type" => "text/html"]` 等
- `$set`：可选参数，`array` 类型，请求时 Swoole 的客户端参数，见 [Swoole 文档](https://wiki.swoole.com/#/coroutine_client/http_client?id=set)
- `$return_body`：可选参数，`bool` 类型，默认为 `FALSE`，如果为 `TRUE` 则函数返回的是返回的 body 字符串或 `FALSE` (请求失败时)，如果为 `FALSE` 返回的是 `Swoole\Coroutine\Http\Client` 对象。

样例：

```php
$r = ZMRequest::get("http://www.example.com/", ["Content-Type" => "text/html"], [], true);
if($r !== false) echo $r.PHP_EOL;
else echo "请求出错！".PHP_EOL;
```

## ZMRequest::post()

使用 Swoole 协程客户端发起一次 POST 请求

参数：

- `$url`：请求的链接，自动解析端口、HTTPS、DNS等操作（支持 HTTPS 需要在 Swoole 安装时 `enable openssl support`）
- `$headers`：`array` 类型，请求头数组。例如 `["Content-Type" => "text/html"]` 等
- `$data`：`mixed` 类型，POST的数据本体
- `$set`：可选参数，`array` 类型，请求时 Swoole 的客户端参数，见 [Swoole 文档](https://wiki.swoole.com/#/coroutine_client/http_client?id=set)
- `$return_body`：可选参数，`bool` 类型，默认为 `FALSE`，如果为 `TRUE` 则函数返回的是返回的 body 字符串或 `FALSE` (请求失败时)，如果为 `FALSE` 返回的是 `Swoole\Coroutine\Http\Client` 对象。

::: tip 提示
`$data` 数据本体如果传入的是数组，则底层会自动打包为 `x-www-form-urlencoded` 格式的内容，并设置 `Content-Type` 为 `application/x-www-form-urlencoded`
:::

## ZMRequest::request()

使用 Swoole 协程客户端发起一次 HTTP 请求，请求方式和内容的种种参数可自定义设置。

参数：

- `$url`：请求的链接，自动解析端口、HTTPS、DNS 等操作 
- `$attribute`：请求的属性，示例见下方
- `$return_body`：可选参数，`bool` 类型，和上面的 `$return_body` 参数意义相同

其中 `$attribute` 参数对应可设置的有：

- `method`：可选 `GET`，`POST` 等 HTTP 请求的方式
- `set`：设置 Swoole 客户端的参数
- `headers`：要请求的 HTTP Headers
- `data`：请求的 body 数据，为数组时自动转换头部为 `x-www-form-urlencoded`
- `file`：要发送的文件，数组，可选多个文件

例1：使用 GET 请求发送带有 Body 的 HTTP 请求

```php
$r = ZMRequest::request("http://example.com", [
  "method" => "GET",
  "data" => [
    "key1" => "value1"
  ]
]);
```

例2：设置请求超时时间并指定自定义头部

```php
$r = ZMRequest::request("http://example.com", [
  "method" => "POST",
  "headers" => [
    "X-Custom-Header" => "Hello world",
    "User-Agent" => "HEICORE"
  ],
  "set" => ["timeout" => 10.0]
]);
```

例3：发送文件和 data

```php
$r = ZMRequest::request("http://example.com/sendfile", [
  "file" => [
    [
      "path" => "/path/to/image1.jpg", // path字段必填
      "name" => "file1", // name字段必填，这个是 POST 过去的 key
      //"mime_type" => "image/jpeg", // 可选字段，底层会自动推断
      //"filename" => "a.jpg", // 可选字段，文件名称
      //"offset" => 0, // 可选字段，可以从指定文件的中间部分开始传输数据，此特性用于断点续传
      //"length" => 1024 // 可选字段，默认为整个文件的尺寸
    ],
    [
      "path" => "/path/to/image2.jpg",
      "name" => "file2"
    ]
  ],
  "data" => [
    "key1" => "value1"
  ]
]);
```

## ZMRequest::websocket()

> 从 1.5.0 版本起可用。

内置的轻量级 WebSocket 客户端（协程同步转异步模式），详情见 [ZMWebSocket 组件](zmwebsocket)。