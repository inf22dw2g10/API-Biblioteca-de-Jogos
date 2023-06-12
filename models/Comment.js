const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Game = require('./Game');

class Comment extends Model {}
Comment.init(
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);

Comment.belongsTo(User, { onDelete: 'CASCADE' });
Comment.belongsTo(Game , { onDelete: 'CASCADE' });

module.exports = Comment;
