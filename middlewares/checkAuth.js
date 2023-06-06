const jwt = require('jsonwebtoken');
const Session = require('../models/Session');
const User = require('../models/User');
const {createAccessToken, createCookie} = require("../middlewares/createToken")
require('dotenv').config();

const checkAuth = async (req, res, next) => {
  const token = req.cookies.token
  try{
    var user = jwt.decode(token)
    
    if(user.exp < Date.now() /1000){

      const checkRefreshToken = await Session.findOne({where:{accessToken: token}})

      if(checkRefreshToken){

        const refreshToken = jwt.decode(checkRefreshToken.dataValues.refreshToken)

        if(refreshToken.exp > Date.now()/1000 ){

          const dbUser = await User.findByPk(user.id)

          const accessToken = createAccessToken(dbUser.dataValues.id, dbUser.dataValues.username, dbUser.dataValues.email, dbUser.dataValues.admin)

          const newSession = await Session.update({
            accessToken: accessToken
          },{where:{
            accessToken: token
          }})
          createCookie(res, accessToken, refreshToken.exp)
          var user = jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET);

          req.user = user
          next()
          
        }else{
          res.clearCookie("token")
          res.status(401).json({ message: 'Authentication failed', error: error.message });
        }
      }else{

        res.clearCookie("token")
        res.status(401).json({ message: 'Authentication failed', error: error.message });
      }

    }else{
      req.user = user
      next()
    }
  }catch (error) {
    res.clearCookie("token")
    res.status(401).json({ message: 'Authentication failed!'});
  }
};

module.exports = checkAuth
