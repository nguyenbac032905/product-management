const Room = require("../../models/room-chat.model");
// module.exports.isAccess = async (req,res,next) =>{
//     const roomChatId = req.params.roomChatId;
//     const userId = res.locals.user.id;
//     const existUser = await Room.findOne({_id: roomChatId,deleted: false,"users.user_id": userId});
    
//     if(existUser){
//         next();
//     }else{
//         res.redirect("/users/friends");
//     }
// };
module.exports.support = async (req,res,next) =>{
    const userId = res.locals.user.id;
    const myRoom = await Room.findOne({  
        typeRoom:"group",
        deleted: false,
        "users.user_id": userId
    });
    res.locals.myRoomChat = myRoom;
    next();
};