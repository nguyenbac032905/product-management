const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");
const Role = require("../../models/role.modle");

module.exports.requireAuth = async (req,res,next) =>{
    
    if(req.cookies.token){
        const user = await Account.findOne({token: req.cookies.token}).select("-password -token");
        if(!(user)){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }else{
            const role = await Role.findOne({
                _id: user.role_id
            }).select("title permission");

            res.locals.user = user;
            res.locals.role = role;
            next();
        }
    }else{
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
};