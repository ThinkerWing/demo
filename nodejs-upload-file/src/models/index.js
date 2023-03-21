const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.excel = require("./ExcelModel.js")(sequelize, Sequelize);
db.video = require("./Video.js")(sequelize, Sequelize);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("已成功建立连接");
  } catch (error) {
    console.error("连接失败", error);
  }
})();
module.exports = db;
