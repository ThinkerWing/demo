const express = require("express");
const router = express.Router();
const excelController = require("../controllers/ExcelController");
const videoController = require("../controllers/VideoController");
const upload = require("../middlewares/upload");
const videoUpload = require("../middlewares/videoUpload");

const routes = app => {
  router.post("/excel/upload", upload.single("file"), excelController.upload); // 上传excel
  router.get("/excel/list", excelController.getExcelData); // 查看excel
  router.get("/excel/download", excelController.download); // 下载excel模版

  router.get("/video/list", videoController.getData); // 查看video list
  router.post(
    "/video/upload",
    videoUpload.single("file"),
    videoController.upload
  ); // 上传video

  return app.use("/api", router); // 路由加上前缀
};

module.exports = routes;
