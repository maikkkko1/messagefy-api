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

  return Notification;
};
