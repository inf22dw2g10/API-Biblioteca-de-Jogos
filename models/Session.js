const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Sequelize = require('sequelize');
const User = require('./User');

class Session extends Model {}
Session.init(
  {
    accessToken: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    refreshToken:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    expirationDate:{
      type: DataTypes.DATE,
      allowNull:false,
    }
  },
  {
    hooks:{
      afterCreate: async (session, options) => {
        await Session.destroy({
          where: {
            expirationDate: {
              [Sequelize.Op.lt]: new Date(),
            },
          },
        });
      }
    },
    timestamps: false,
    sequelize,
    modelName: 'Session',
  }
);

Session.belongsTo(User , { onDelete: 'CASCADE' });

module.exports = Session;
