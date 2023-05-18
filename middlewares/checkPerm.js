const User = require('../models/User');

const checkPerm = async (req,res,next)=>{
    
    try{

        const checkUser = await User.findByPk(req.user.id)

        checkUser.dataValues.admin
    if(checkUser.dataValues.admin){
        req.user = req.user
        next()
    }else{
        res.status(401).json({ message: "You don't have permissions"});
    }
    
    }catch (error) {
        res.status(401).json({ message: "You don't have permissions"});
    }

}
module.exports = checkPerm