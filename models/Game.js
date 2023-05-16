const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Game extends Model {}
Game.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: 'Game',
  }
);

module.exports = Game;
