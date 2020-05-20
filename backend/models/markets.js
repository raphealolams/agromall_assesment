"use strict";
module.exports = (sequelize, DataTypes) => {
  const Markets = sequelize.define(
    "Markets",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: sequelize.literal("gen_random_uuid()"),
      },
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
      category: { type: DataTypes.STRING },
      address: { type: DataTypes.TEXT },
      coordinate: { type: DataTypes.JSON },
      pictures: { type: DataTypes.ARRAY(DataTypes.TEXT) },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );
  Markets.associate = function (models) {
    // associations can be defined here
  };
  return Markets;
};
