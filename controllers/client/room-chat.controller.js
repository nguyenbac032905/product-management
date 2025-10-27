const User = require("../../models/user.model");
const RoomChat = require("../../models/room-chat.model");
module.exports.index = (req,res) =>{
    res.render("client/pages/rooms-chat/index",{
        pageTitle: "Chat nhóm"
    });
};
module.exports.create = async (req,res) =>{
    const friendList = res.locals.user.friendList;
    for(const friend of friendList){
        const userInfo = await User.findOne({_id: friend.user_id, deleted: false}).select("fullName avatar statusOnline");
        friend.userInfo = userInfo;
    }
    res.render("client/pages/rooms-chat/create",{
        pageTitle: "Tạo phòng",
        friendList: friendList
    });
};
module.exports.createPost = async (req,res) =>{
    const title = req.body.title;
    const usersId = req.body.usersId;
    
    const dataRoom = {
        title: title,
        typeRoom: "group",
        users: [],
    };
    
    for(const userId of usersId){
        dataRoom.users.push({
            user_id: userId,
            role: "user"
        });
    }
    dataRoom.users.push({
        user_id: res.locals.user.id,
        role: "superAdmin"
    })
    const roomChat = new RoomChat(dataRoom);
    await roomChat.save();
    res.redirect(`/chat/${roomChat.id}`);
};