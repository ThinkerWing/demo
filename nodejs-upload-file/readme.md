# 参考文献

[https://juejin.cn/post/7103917336293277704](https://juejin.cn/post/7103917336293277704)

[【Excel模版导出和上传】antd Upload + express + mysql 实现 Excel模版导出和上传](https://blog.csdn.net/daddykei/article/details/129584677?spm=1001.2014.3001.5502)
# 启动命令

```
npm start
```

# 接口地址

列表接口 <span style="color:orange">(GET)</span>: `http://localhost:8080/api/excel/list`

文件上传接口 <span style="color:orange">(POST)</span>: `http://localhost:8080/api/excel/upload`

```form-data```
| KEY | VALUE
| ------- | -------
| file | test.xlsx

文件下载接口 <span style="color:orange">(GET)</span>: `http://localhost:8080/api/excel/download`
| Content-Type | application/vnd.openxmlformats- officedocument.spreadsheetml.sheet
| ------- | -------

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


前端代码
```
            <Button onClick={DownloadExcel}>
              下载模版
            </Button>
            <Upload
              accept=".xls,.xlsx"
              beforeUpload={(file) => {
                const allowType = [
                  "application/vnd.ms-excel",
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ];
                const isExcel = allowType.includes(file.type);

                if (!isExcel) {
                  message.error("只能上传 Excel 文件！");
                  return false;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                  message.error("文件大小不能超过 2MB！");
                  return false;
                }
                const reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = () => {
                  const workbook = XLSX.read(reader.result, { type: "binary" });
                  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                  const data = XLSX.utils.sheet_to_json(worksheet);
                  console.log(data);
                };
                setFileList(file);
              }}
            >
              <Button>导入信息</Button>
            </Upload>
            <Button onClick={handleUpload}>上传</Button>
```
下载模版
```
const DownloadExcel = async () => {
  try {
    const api = "http://localhost:8080/api/excel/download";
    const response = await request(api, {
      method: "GET",
      responseType: "blob"
    });

    // 创建URL以下载文件
    const blob = new Blob([response], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filename.xlsx";
    link.click();

    // 释放URL
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
};


```
处理上传文件
```

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", fileList);
    try {
      const response = await request("http://localhost:8080/api/excel/upload", {
        method: "POST",
        body: formData
      });
      message.success(response);
      setFileList([]);
    } catch (error) {
      message.error(error.message);
    }
  };
```