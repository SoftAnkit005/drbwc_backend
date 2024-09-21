const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Variant = sequelize.define(
  "Variant",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    attribute_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "attributes",
        key: "id",
      },
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "variants",
  }
);

module.exports = Variant;
