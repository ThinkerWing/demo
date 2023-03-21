const multer = require("multer");

// 设置存储上传文件的目录
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-zhijianqiu-${file.originalname}`);
  }
});

const videoUpload = multer({ storage: storage });
module.exports = videoUpload;
