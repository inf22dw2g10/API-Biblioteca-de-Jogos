const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Game = require('./Game');

class Comment extends Model {}
Comment.init(
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating:{
      type: DataTypes.SMALLINT,
      allowNull:false,
    }
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);

Comment.belongsTo(User);
Comment.belongsTo(Game);

module.exports = Comment;
