module.exports = (sequelize, Sequelize) => {
  const Excel = sequelize.define("video", {
    filename: {
      type: Sequelize.STRING
    },
    mimetype: {
      type: Sequelize.STRING
    },
    size: {
      type: Sequelize.STRING
    }
  });

  return Excel;
};
