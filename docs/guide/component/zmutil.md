# ZMUtil 杂项

## checkWait()

此函数为内部调用，用途是在 `WorkerStart` 事件执行完之前其他事件需要等待，待其执行完之后会恢复执行。

## stop()

停止运行框架，并保存所有数据和断开所有连接。

## getHttpCodePage()

获取 HTTP 状态对应的默认页面的内容。

## reload()

重启框架，重新加载除 `src/Framework/` 外的所有代码文件。

## getCQ()

解析CQ码。

- 参数：`getCQ($msg);`：要解析出 CQ 码的消息。
- 返回：`数组 | null`，见下表

| 键名   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| type   | CQ码类型，比如 `[CQ:at]` 中的 `at`                           |
| params | 参数列表，比如 `[CQ:image,file=123.jpg,url=http://a.com/a.jpg]`，params 为  `["file" => "123","url" => "http://a.com/a.jpg"]` |
| start  | 此 CQ 码在字符串中的起始位置                                 |
| end    | 此 CQ 码在字符串中的结束位置                                 |

