const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_EXPIRATION_TIME = '30m';
const JWT_REFRESH_EXPIRATION_TIME = '7d';

// função para criar um token de acesso
exports.createAccessToken = (id, username, email, admin) => {
  const token = jwt.sign({id, username, email,admin }, process.env.JWT_ACCESS_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
  return token;
}
exports.createRefreshToken = (id, username, email,admin) => {
  const token = jwt.sign({id, username, email,admin }, process.env.JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION_TIME });
  return token;
}


exports.createCookie = (res,token, exp)=>{
  res.cookie("token",token,{
    httpOnly:false,
    expires:new Date(exp*1000),
    sameSite: 'Lax',
  })
}