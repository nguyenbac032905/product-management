const User = require("../../models/user.model");

module.exports.notFriend = async (req,res) =>{
    const myId = res.locals.user.id;
    const users = await User.find({deleted: false, status: "active",_id: {$ne: myId}}).select("avatar fullName");
    res.render("client/pages/users/not-friend",{
        pageTitle: "Danh sách người dùng",
        users: users
    });
};