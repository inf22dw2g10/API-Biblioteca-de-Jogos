const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class User extends Model {}
User.init(
  {
    avatar:{
      type:DataTypes.STRING,
      defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: true,
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
    balance:{
      type: DataTypes.FLOAT,
      defaultValue: 0
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
