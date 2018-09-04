---
sidebar: auto
---

# flask

## 要点

- flask 路由遵循最小原型和唯一 URL 原则

- `@app.route()` 装饰器控制路由，修饰视图函数

- `app.add_url_rule()` 注册路由 e.g `app.add_url_rule('/hello', view_func=hello)`，但是绝大多数情况都是用装饰器的方式

- `app.run()` 参数配置

  - debug 是否开启调试模式 e.g debug=True，生产环境 debug='off'
  - host 服务器主机 e.g host=0.0.0.0
  - port 端口

- 读取配置 `app.config.from_object()` config 是继承 dict 字典的子类，配置文件里面的常量必须全大写 'DEBUG' 是个默认参数，默认为 False

- 为什么用判断 `if __name__ == '__main__'`

  - 判断文件是否作为入口文件而不是被其他文件所调用
  - 生产环境部署时，一般不会使用 flask 自带的服务器，而是用 nginx+uwsgi 来部署项目，所以入口文件很有可能被其他程序调用，所以要加上这个判断

- 视图函数是被封装过的函数，与普通函数不同，它会返回与 http 协议相关的一些内容

  - status-code、content-type 等
  - 视图函数返回的都是 Response 对象
  - 通过 make_response 方法创建 Response 对象，并由视图函数返回
  - 视图函数可以直接返回一个元组 `return '<h2>Flask</h2>', 200, 'text/html'`

- requests 与 urllib 对比

  - requests 是第三方包
    - request 无以下操作
  - urllib 内置包
    - 使用 `quote()` 进行编码
    - `r.read()` 去读取请求的内容，读出来的是字节码
    - 使用 `str()` 解析字节流
    - `try...catch` 做异常处理

- flask 蓝图
  - blueprint
  - 通过蓝图来组装视图函数
- flask Request 对象
  - Request
  - 使用 wtforms 和 Flask_WTForms 做数据验证
- 数据库创建表的方式
  - Database First
  - Model First
  - Code First
    - 专注业务模型的设计，而不是专注数据库的设计
    - 数据库只是用来存取数据的，表关系应该由业务来决定
    - ORM 对象关系映射 比 Code First 更广
- python 连接数据库
  - sqlalchemy
  - Flask_SQLAlchemy
  - `SQLALCHEMY_DATABASE_URI = 'mysql+cymysql://root:123456@localhost:3306/fisher'`
  - `SQLALCHEMY_TRACK_MODIFICATIONS = False`

## flask 核心

- `Flask` app 核心对象
- `Request` 请求核心对象
- `AppContext` 应用上下文
  - 是对 `Flask` 核心的包装
- `RequestContext` 请求上下文
  - 是对 `Request` 核心的包装
  - 它要入栈会在逻辑上检查对应的 `AppContext` 是否入栈
- `request` 请求上下文栈顶对象
  - 实际上是根据 `name` 返回的一个对象
  - 通过 `LocalProxy()` 获取
- `current_app` 应用上下文栈顶对象
  - 实际上返回的是 app 核心对象
  - 通过 `LocalProxy()` 获取
- 通过 `ctx = app.app_context()` 创建一个应用上下文
  - `ctx.push()` 压栈
  - `ctx.pop()` 弹栈
- `with` 语句，上下文表达式
  - 实现了 `__enter__` 和 `__exit__` 方法，就可以使用 `with` 语句，即实现了上下文协议
  - 上下文管理器包含：`__enter__` 和 `__exit__`
  - `__exit__` 返回 `False` 则 `with` 外部会继续抛出异常，`True` 则不会
  - 用处：链接数据库、文件读写
  - 一些地方可以替代 `try except finally`
  - as 后面的变量是 `__enter__` 返回的值

```python
with app.app_context():
    a = current_app
    print(a)
    b = current_app.config['DEBUG']

with open(r'path') as f:
  print(f.read())
  # f.close() 会自动执行
```

flask 核心流程图
![flask核心流程图](./image/002001.png)
