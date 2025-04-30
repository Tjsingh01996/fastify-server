// models/Product.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Your database setup

const Product = sequelize.define(
  "Product",
  {
    article_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    product_service: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    in_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "products",
    underscored: true, 
    timestamps: true, 
  }
);

module.exports = Product;
