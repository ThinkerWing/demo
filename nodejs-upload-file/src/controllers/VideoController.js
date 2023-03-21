const db = require("../models");
const VideoDB = db.video;

const upload = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send("Please upload an video file!");
    }
    const { filename, mimetype, size } = req.file;
    VideoDB.create({ filename, mimetype, size })
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname
    });
  }
};

const getData = (req, res) => {
  VideoDB.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error."
      });
    });
};

module.exports = {
  upload,
  getData
};
