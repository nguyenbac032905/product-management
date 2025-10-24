const User = require("../../models/user.model");
const userSocket = require("../../sockets/client/user.socket");
module.exports.notFriend = async (req,res) =>{
    userSocket(res);
    const myId = res.locals.user.id;
    const myUser = await User.findOne({_id: myId});
    const requestfriend = myUser.requestFriends;
    const acceptfriend = myUser.acceptFriends;

    const users = await User.find({
        $and: [
            {_id: {$ne: myId},},
            {_id: {$nin: requestfriend}},
            {_id: {$nin: acceptfriend}}
        ],
        deleted: false,
        status: "active",
    }).select("avatar fullName");

    res.render("client/pages/users/not-friend",{
        pageTitle: "Danh sách người dùng",
        users: users
    });
};
module.exports.request = async (req,res) =>{
    const myId = res.locals.user.id;
    const myUser = await User.findOne({_id: myId});
    const requestfriends = myUser.requestFriends;

    userSocket(res);

    const users = await User.find({
        deleted: false,
        status: "active",
        _id: {$in: requestfriends}
    });

    res.render("client/pages/users/request",{
        pageTitle: "Lời mời đã gửi",
        users: users
    });
};