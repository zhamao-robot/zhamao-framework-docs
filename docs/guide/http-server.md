# HTTP 服务器

最先开始的时候，我们说了 炸毛框架 不仅仅是聊天机器人的框架，还是一个完整的 HTTP + WebSocket 服务器，你不仅可以开发机器人功能，框架还可用于开发任何 Web 应用程序，构建高性能的 Web 系统、API、中间件、基础服务等。

::: tip 提示

炸毛框架的注解和 HTTP 服务器控制器响应方式高度类似 **Swoft** 框架，如果你熟悉 Swoft 框架的话，这里学习起来将会非常容易。

:::

## 功能特色

- 基于 `@RequestMapping` 和 `@Controller` 的路由注解
- 提供简单的参数支持
- 响应迅速，无任何臃肿的框架代码，无过多封装，直接操作原生的 Swoole 对象

在一般情况下，我们启动了炸毛框架后，HTTP 服务器就自动启动了，访问框架监听的地址和端口，就可以访问 HTTP 服务。

## Controller 和 RequestMapping

控制器主要通过 `@Controller` 注解实现。此注解仅适用于对类进行修饰。

- 名称：`@Controller`
- 命名空间：`ZM\Annotation\Http\Controller`
- 参数：`*prefix`
- 作用：声明此类下所有路由的根路由地址。

- 名称：`@RequestMapping`
- 命名空间：`ZM\Annotation\Http\RequestMapping`
- 参数：`*route`，`name`，`method`
- 作用：路由地址

### 路由规则

通常情况，一个完整的路由 `path` 等于 `@Controller` 的 `prefix` + `@RequestMapping` 的 `route`。例如：

```php
<?php
namespace Module\Example;
use ZM\ModBase;
use ZM\Annotation\Http\Controller;
use ZM\Annotation\Http\RequestMapping;
/**
 * @Controller("/api")
 */
class Test extends ModBase {
    /**
     * @RequestMapping("/index")
     */
    public function index(){
        $this->response->end("This is API index page");
    }
  	/**
  	 * @RequestMapping("/ping")
  	 */
    public function ping(){
        $this-response->end("pong");
    }
}
```

以上编写后，从浏览器访问 `http://127.0.0.1:20001/api/index` 时就会访问到 `This is API index page`，访问 `/api/ping` 时就会返回 `pong`。

::: tip 提示

当 `@Controller` 为 `/` 的时候，效果和不写是一样的，`@RequestMapping` 为 `/` 或 `/index/inside` 等多级路由也是可以的。

:::

## 绑定参数

在 `@RequestMapping` 中，不仅可以写静态的路由地址，也可以写绑定的参数。例如：`@RequestMapping(route="/index/{name}")`，则访问 `/index/xxx` 的时候，你在函数方法内可以这样获取此参数：

```php
public function index($arg) {
    $this->response->end("Your param 'name' is ".$arg["name"]);
}
```

## 设置路由请求方式

如果想要设置允许请求控制器的 HTTP 请求方式，可以使用方法在控制器中的 `@RequestMapping` 注解配置 `method` 参数，可以是 `GET`，`POST`，`PUT`, `PATCH`，`DELETE`，`OPTIONS`，`HEAD` 中的一个或多个。

- 限定 HTTP 方法：`@RequestMapping(method="GET")`，`@RequestMapping(method={"GET","POST"})`

## 事件可用的基类变量

- `$this->request`：`swoole_http_request` 对象，可查阅 [Swoole 文档](https://wiki.swoole.com/#/http_server?id=httprequest)
- `$this->response`：`swoole_http_response` 对象，可查阅 [Swoole 文档](https://wiki.swoole.com/#/http_server?id=httpresponse)

## HTTP 客户端

框架内依赖了 Swoole 官方推荐的 `Saber`，可直接在任意位置使用。这里是 [Saber 地址](https://github.com/swlib/saber)。

对于 GET 请求 和 POST 请求，框架内也封装了轻量的函数调用，最好不要在框架内使用 `file_get_contents` 类和 `curl_exec` 之类的网络请求函数，可能会使协程阻断，Saber 和框架内的轻量化函数都是协程优化的。