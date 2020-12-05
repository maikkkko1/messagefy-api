("use strict");

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("device", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
      },
      token: {
        allowNull: true,
        type: DataTypes.TEXT,
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
    return queryInterface.dropTable("device");
  },
};
