const uploadToCloud = require("../../helpers/uploadCloudinary");
const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
module.exports = (res) =>{
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    //thay on bằng once để chỉ lắng nghe 1 lần
    _io.once('connection', (socket) => {
        console.log('a user connected',socket.id);
        //message
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            let images = [];
            for(const image of data.images){
                const link = await uploadToCloud(image);
                images.push(link);
            }
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images
            });
            await chat.save();
            // trả về cho client
            _io.emit("SERVER_RETURN_MESSAGE",{
                user_id: userId,
                fullName: fullName,
                content: data.content,
                images: images
            })
        })
        //typing
        socket.on("CLIENT_SEND_TYPING",(type) =>{
            socket.broadcast.emit("SERVER_RETURN_TYPING",{
                user_id: userId,
                fullName: fullName,
                type: type
            })
        })
    });
}