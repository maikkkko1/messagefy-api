const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "notification",
    {
      deviceToken: DataTypes.STRING,
      deviceId: DataTypes.STRING,
      title: DataTypes.STRING,
      message: DataTypes.STRING,
      received: DataTypes.BOOLEAN,
    },
    { freezeTableName: true }
  );

  Notification.beforeCreate((v) => (v.id = uuidv4()));

  return Notification;
};
