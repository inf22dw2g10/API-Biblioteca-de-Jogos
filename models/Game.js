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
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    genre:{
      type: DataTypes.STRING ,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    sequelize,
    modelName: 'Game',
  }
);

module.exports = Game;
