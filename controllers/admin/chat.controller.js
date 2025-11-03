const Chat = require("../../models/chat.model");
const Account = require("../../models/account.model");
const User = require("../../models/user.model");
const chatSocket = require("../../sockets/admin/chat.socket");
module.exports.index = async (req,res) => {
    const roomChatId = req.params.roomChatId;
    chatSocket(req,res);
    //lay data tu database
    const chats = await Chat.find({deleted: false,room_chat_id: roomChatId});
    for(const chat of chats){
        const infoUser = await User.findOne({_id: chat.user_id}).select("fullName avatar");
        chat.infoUser = infoUser;
        const infoAdmin = await Account.findOne({_id: chat.user_id}).select("fullName avatar");
        chat.infoAdmin = infoAdmin;
    }
    res.render("admin/pages/chat/index",{
        pageTitle: "Chat",
        chats: chats
    });
};