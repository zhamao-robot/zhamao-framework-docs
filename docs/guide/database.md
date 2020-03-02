# 数据库

## 配置

炸毛框架的数据库组件高度~~模仿~~贴近 **Swoft**，支持原生 SQL、查询构造器，去掉了复杂的对象模型关联，同时默认为数据库连接池，IO 操作自动转换为 Swoole 的 MySQL 协程客户端，使开发变得简单。而且框架还对查询构造器编写了缓存机制，当大量请求是固定查询的话，可大幅优化数据库查询性能，可在配置文件中选择开启。

数据库的配置位于 `config/global.php` 文件的 `sql_config` 段。

数据库操作的唯一核心工具类和功能类为 `\ZM\DB\DB`，使用前需要配置 host 和 use 此类。

## 查询构造器

在 炸毛框架 中，数据库查询构造器为创建和执行数据库查询提供了一个方便的接口，它可用于执行应用程序中大部分数据库操作。同时，查询构造器使用 `prepare` 预处理来保护程序免受 SQL 注入攻击，因此没有必要转义任何传入的字符串。

### 新增数据

```php
DB::table("admin")->insert(['admin_name', 'admin_password'])->save();
```

其中 `insert` 的参数是插入条目的数据列表。假设 admin 表有 `name`，`password` 两列。

### 删除数据

```php
DB::table("admin")->delete()->where("name", "admin_name")->save();
```

其中 `where` 语句的第一个参数为列名，当只有两个参数时，第二个参数为值，效果等同于 SQL 语句：`WHERE name = 'admin_name'`，当含有第三个参数且第二个参数为 `=`，`!=`，`LIKE` 的时候，效果就是 `WHERE 第一个参数 第二个参数的操作符 第三个参数`。

### 更新数据

```php
DB::table("admin")->update(["name" => "fake_admin"])->where("name", "admin_name")->save();
```

`update()` 方法中是要 SET 的内容的键值对，例如上面把 `name` 列的值改为 `fake_admin`。

### 查询数据

```php
$r = DB::table("admin")->select(["name"])->where("name", "fake_admin")->fetchFirst();
echo $r["name"];
// 两种写法的效果是等价的
echo DB::table("admin")->where("name", "fake_admin")->value("name");
```

`select()` 方法的参数是要查询的列，默认留空为 `["*"]`，也就是所有列都获取，也可以在 table 后直接 where 查询。

其中 `fetchFirst()` 获取第一行数据。

如果只需获取一行中的一个字段值，也可以通过上面所示的 `value()` 方法直接获取。

多列数据获取需要使用 `fetchAll()`

```php
$r = DB::table("admin")->select()->fetchAll();
foreach($r as $k => $v) {
    echo $v["name"].PHP_EOL;
}
```



## 直接执行 SQL 

>  在查询器外执行的 SQL 语句都不会被缓存，都是一定会请求数据库的。

### DB::rawQuery()

- 用途：直接执行模板查询的裸 SQL 语句。
- 参数：`$line`，`$params`

`$line` 为请求的 SQL 语句，`$params` 为模板参数。

```php
$r = DB::rawQuery("SELECT * FROM admin WHERE name = ?", ["fake_admin"]);
echo $r[0]["password"];
```

