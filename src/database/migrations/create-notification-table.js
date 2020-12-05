("use strict");

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("notification", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
      },
      deviceToken: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      deviceId: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      message: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      received: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("notification");
  },
};
