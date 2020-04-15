---
sidebar: auto
---
# 常见问题

## CQHTTP 连不上框架

**一**、请检查你的 CQHTTP 插件的配置文件是否正确。比如你的 CQHTTP 曾登录过不止一个 QQ 号码，且配置文件不为 general 和对应机器人的配置文件。CQHTTP 配置文件中几条核心的配置，这三条是必须填写的：

- `use_ws_reverse: true`
- `ws_reverse_use_universal_client: true`
- `ws_reverse_url: ws://127.0.0.1:20001`

推荐可选配置：`access_token: 你的 token`

**二**、检查炸毛框架的 `config/global.php` 中端口和地址有没有开到正确的位置，比如：酷Q和框架所在的服务器不在同一台，则框架监听地址不可以是 `127.0.0.1`，这样的情况下你需要填写你的服务器 IP 地址。如果还是无法连接，请检查服务器防火墙。如果是 Docker 用户，请检查 酷Q Docker 暴露的端口是否成功，可以先开启 CQHTTP 的 `use_http` 来尝试访问是否通畅。

**三**、检查是否使用了安全的 WebSocket 连接。框架目前因为 Swoole 对 SSL/TLS 加密协议支持不完整，所以请不要直接使用 `wss` 来接入，可使用 `nginx` 等方案反向代理。

