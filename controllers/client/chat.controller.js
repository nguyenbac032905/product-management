const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
module.exports.index = async (req,res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    //thay on bằng once để chỉ lắng nghe 1 lần
    _io.once('connection', (socket) => {
        console.log('a user connected',socket.id);
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            const chat = new Chat({user_id: userId,content: content});
            await chat.save();
            //trả về cho client
            _io.emit("SERVER_RETURN_MESSAGE",{
                user_id: userId,
                fullName: fullName,
                content: content
            })
        })
    });

    //lay data tu database
    const chats = await Chat.find({deleted: false});
    for(const chat of chats){
        const infoUser = await User.findOne({_id: chat.user_id}).select("fullName");
        chat.infoUser = infoUser;
    }
    res.render("client//pages/chat/index",{
        pageTitle: "Chat",
        chats: chats
    });
};