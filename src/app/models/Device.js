const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    "device",
    {
      token: DataTypes.STRING,
    },
    { freezeTableName: true }
  );

  Device.beforeCreate((v) => (v.id = uuidv4()));

  return Device;
};
