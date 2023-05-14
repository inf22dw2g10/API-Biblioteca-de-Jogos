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
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Game',
  }
);

module.exports = Game;
