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

## 进程和线程

### 进程

计算机资源是有限的，应用程序需要去竞争计算机的资源，而进程是竞争计算机资源的基本单元

操作系统如何管理应用程序对计算机的资源进行竞争————进程管理。进程是操作系统用来调度和分配资源的单位。每个应用程序至少一个进程，操作系统调度不同的进程，让他们轮番的使用计算机的进程

单核 CPU，同一时刻只能运行一个应用程序，但 CPU 的运算速度足够快（快到感觉不到切换），所以 CPU 可以不同时刻在不同应用程序之间切换运行（进程调度）。进程/线程切换对系统的开销是比较大的，因为要切换应用程序的上下文，不同的应用程序的上下文是不一样的

### 线程

线程是进程的一部分，一个进程可以有一个或者多个线程。CPU 越来越快，进程管理调度的粒度太大，不能高效利用 CPU 的性能，需要一个更小的单元来管理/使用 CPU 的资源，进程的切换非常笨重，所以需要更灵活的线程机制来协调 CPU 资源的利用，线程切换的消化远比进程切换要小。线程与进程最大的区别是分工不同，**进程分配资源，线程利用 CPU 等资源执行代码或程序**

### 多线程

```python
import threading

t = threading.current_threading() # 获取当前线程，默认是主线程

new_t = threading.Thread(target=func, name='thread_name') # 传入子线程执行的目标函数
new_t.start() # 启动子线程，并不会阻塞主线程里的其他代码执行，只是启动

print(t.getName())
```

优点

- 更加充分的利用 CPU 的性能优势
- 异步编程
- 适合 IO 密集型的程序，查询数据库、请求网络资源、读写文件等

缺点

- python 不能充分利用多核 CPU 的优势，但并不一定是鸡肋
- GIL 全局解释器锁，决定同一时刻一个 CPU 核上只能执行一个线程，GIL 是为了线程安全
- 严重依赖于 CPU 计算的程序来说，比较鸡肋（CPU 密集型的程序）

flask

- flask 默认是单进程、单线程的
- 通过指定关键参数 `threaded=True` 开启多线程，`processs=2` 开启多进程
- flask 使用了 werkzeug 库来实现线程隔离，里面有一个 Local 对象用来做线程隔离，实际上就是对字典数据结构和线程 id 的封装
- Local 使用字典的方式实现线程隔离
- LocalStack 封装了 Local 对象，将其作为自己的一个私有属性，从而实现了线程隔离的栈结构
- 梳理
  - 以线程 ID 号作为 key 的字典 → Local → LocalStack
  - AppContext、RequestContext → LocalStack
  - Flask → AppContext Request → RequestContext
  - current_app → (LocalStack.top = AppContext top.app=Flask)
  - request → (LocalStack.top = RequestContext top.Request=Request)

> 使用线程隔离的意义：使当前线程能够正确引用到它自己创建的对象，而不是引用到其他线程所创建的对象，这些对象是保存状态的地方

## 面向对象滥用

- 面向对象应该描述特征（类变量、实例变量）
- 面向对象应该具有行为（方法）
- 只有方法的类，其实是伪装为面向对象的面向过程
- 一个类的方法大量标注了 `@classmethod @static`，即方法并未使用到任何类变量和实例变量，封装性不太好

## python 序列化 class 类对象

- 使用 json 模块, `json.dumps(obj, default=lambda o:o.__dict__)`
- 函数式编程转义 json 序列化的代码解释权
