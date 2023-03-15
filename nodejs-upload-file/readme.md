# 参考文献

[https://juejin.cn/post/7103917336293277704](https://juejin.cn/post/7103917336293277704)

# 目录结构

```
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── resources
│   └── static
│       └── assets
│           └── uploads // 存储上传的excel文件
└── src
    ├── app.js // 初始化路线，运行 Express 应用程序
    ├── config
    │   └── db.config.js // 导出 MySQL 连接和 Sequelize 的配置参数。
    ├── controllers // 创建文件上传的控制器
    │   └── ExcelController.js
    │     //  1. 用于`read-excel-file`读取文件夹中│ 的 Excel 文件`uploads`，然后使用 │ Sequelize Model 将数据保存到 MySQL 数据库中。
    │     //  2. 用于检索数据库表中所有教程的导出函数
    ├── middlewares
    │   └── upload.js // 初始化 Multer Storage 引擎并定义中间件函数以将 Excel 文件保存在`uploads`文件夹中。
    ├── models
    │   ├── ExcelModel.js
    │   └── index.js // 定义从 数据请求的路由，使用控制器（连同中间件）来处理请求。
    └── routes
        └── index.js // 定义文件上传的接口

```
