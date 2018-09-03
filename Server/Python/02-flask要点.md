---
sidebar: auto
---

# flask 要点

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
