const express = require("express");
const app = express();
const db = require("./models");
const initRoutes = require("./routes");
const cors = require('cors');
const path = require("path");

global.__basedir = __dirname + "/..";


app.use(express.static(path.join(__basedir, "resources/static/assets/uploads")));

// 返回仅解析 urlencoded 正文且仅查看 Content-Type 标头与类型选项匹配的请求的中间件
app.use(express.urlencoded({ extended: true }));

// 允许所有来源的跨域请求
app.use(cors());

initRoutes(app);

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
