const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class User extends Model {}
User.init(
  {
    avatar:{
      type:DataTypes.STRING,
      defaultValue: "https://play-lh.googleusercontent.com/XmM0qNgU3jKHOa8JqlsSS9XQqhN3rB4sYRg1B-bSWvlMpk4ACU2yDFkG1REKwGZfyBTJ=s256-rw"
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gitHubToken:{
      type: DataTypes.STRING,
      unique:true
    },
    games:{
      type:DataTypes.JSON,
      defaultValue: {"games": []}
    },
    admin:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'User',
  }
);


module.exports = User;
