const express = require("express");
const router = express.Router();
const excelController = require("../controllers/ExcelController");
const upload = require("../middlewares/upload");

const routes = app => {
  router.post("/upload", upload.single("file"), excelController.upload);
  router.get("/list", excelController.getExcelData);

  router.get("/download", excelController.download);

  return app.use("/api/excel", router); // 路由加上前缀
};

module.exports = routes;
