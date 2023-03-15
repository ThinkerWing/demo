const db = require("../models");
const ExcelDB = db.excel;

const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");

/**
    首先我们从req.file 读取文件数据
    接下来我们使用读取上传文件夹中的read-excel-file Excel 文件，将返回的数据更改为数组。
    然后我们使用 Sequelize 模型方法将数组（id、title、description、published）保存到 MySQL 数据库。
    rows excel bulkCreate()``excel

    该getExcelData()函数使用findAll()方法返回存储在数据库excel表中的所有数据。

 */
const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    readXlsxFile(path).then(rows => {
      // skip header
      rows.shift();

      let excelData = [];

      rows.forEach(row => {
        let item = {
          id: row[0],
          title: row[1],
          description: row[2],
          published: row[3]
        };

        excelData.push(item);
      });

      ExcelDB.bulkCreate(excelData)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname
          });
        })
        .catch(error => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname
    });
  }
};

const getExcelData = (req, res) => {
  ExcelDB.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error."
      });
    });
};

const download = (req, res) => {
  ExcelDB.findAll().then(objs => {
    let excelData = [];

    objs.forEach(obj => {
      excelData.push({
        id: obj.id,
        title: obj.title,
        description: obj.description,
        published: obj.published
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("ExcelData");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Title", key: "title", width: 25 },
      { header: "Description", key: "description", width: 25 },
      { header: "Published", key: "published", width: 10 }
    ];

    // Add Array Rows
    worksheet.addRows(excelData);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "zhijianqiu.xlsx"
    );

    return workbook.xlsx.write(res).then(function() {
      res.status(200).end();
    });
  });
};

module.exports = {
  upload,
  getExcelData,
  download
};
