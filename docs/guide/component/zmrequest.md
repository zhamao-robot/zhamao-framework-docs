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