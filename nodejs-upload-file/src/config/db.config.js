module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123456",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5, // 池中的最大连接数
    min: 0, // 池中的最小连接数
    acquire: 30000, // 最大时间，以毫秒为单位，该池将在抛出错误之前尝试获取连接
    idle: 10000 // 连接被释放前可以空闲的最长时间，以毫秒为单位
  }
};
