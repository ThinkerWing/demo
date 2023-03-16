const multer = require("multer");

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

const storage = multer.diskStorage({
  /*
destination 选项主要作用是确定文件上传后存储的文件夹，filename 
我们将[timestamp]-zhijianqiu-前缀添加到文件的原始名称中，以确保不会出现重复项。
  */
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-zhijianqiu-${file.originalname}`);
  }
});

const uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;
