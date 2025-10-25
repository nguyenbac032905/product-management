const User = require("../../models/user.model");
module.exports = (res) =>{
    _io.once("connection", (socket) =>{
        //thêm bạn
        socket.on("CLIENT_ADD_FRIEND", async (userId) =>{
            const myId = res.locals.user.id;

            //Id a vao accepfriend cua b
            const existAcceptUser = await User.findOne({_id: userId,acceptFriends: myId});
            if(!existAcceptUser){
                await User.updateOne({_id: userId},{$push: {acceptFriends: myId}});
            }
            //Id b vao requestfriend cua a
            const existRequestUser = await User.findOne({_id: myId,requestFriends: userId});
            if(!existRequestUser){
                await User.updateOne({_id: myId},{$push: {requestFriends: userId}});
            }

            //lấy ra độ dài acceptFriend của b và trả  về cho b
            const infoUserB = await User.findOne({_id: userId});
            const lengthAcceptFriend = infoUserB.acceptFriends.length;
            
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
                userId: userId,
                lengthAcceptFriend: lengthAcceptFriend
            });

            //lấy infoUser của a gửi cho b
            const infoUserA = await User.findOne({_id: myId}).select("fullName avatar");
            socket.broadcast.emit("SERVER_RETURN_INFOUSER_A",{
                userId: userId,
                infoUserA: infoUserA
            });
        })
        //hủy lời mời
        socket.on("CLIENT_CANCEL_FRIEND", async (userId) =>{
            const myId = res.locals.user.id;
            
            //xoa id cua a khoi acceptfriend cua b
            const existAcceptUser = await User.findOne({_id: userId, acceptFriends: myId});
            if(existAcceptUser){
                await User.updateOne({_id: userId},{$pull: {acceptFriends: myId}});
            }
            //xoa id cua b khoi requestfriend cua a
            const existRequestUser = await User.findOne({_id: myId, requestFriends: userId});
            if(existRequestUser){
                await User.updateOne({_id: myId},{$pull: {requestFriends: userId}});
            }
            //lấy ra độ dài acceptFriend của b và trả  về cho b
            const infoUserB = await User.findOne({_id: userId});
            const lengthAcceptFriend = infoUserB.acceptFriends.length;
            
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
                userId: userId,
                lengthAcceptFriend: lengthAcceptFriend
            });
        })
        //từ chối kết bạn
        socket.on("CLIENT_REFUSE_FRIEND", async (userId) =>{
            const myId = res.locals.user.id;
            //xoa id cua a khoi acceptfriend cua b
            const existAcceptUser = await User.findOne({_id: myId, acceptFriends: userId});
            if(existAcceptUser){
                await User.updateOne({_id: myId},{$pull: {acceptFriends: userId}});
            }
            //xoa id cua b khoi requestfriend cua a
            const existRequestUser = await User.findOne({_id: userId, requestFriends: myId});
            if(existRequestUser){
                await User.updateOne({_id: userId},{$pull: {requestFriends: myId}});
            }
        })
        //đồng ý kết bạn
        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) =>{
            const myId = res.locals.user.id;
            //them a vao friendList cua b
            //xoa id cua a khoi acceptfriend cua b
            const existAcceptUser = await User.findOne({_id: myId, acceptFriends: userId});
            if(existAcceptUser){
                await User.updateOne({_id: myId},{
                    $pull: {acceptFriends: userId},
                    $push: {friendList: {
                        user_id: userId,
                        room_chat_id: ""
                    }}
                });
            }
            //them b vao friendList cua a
            //xoa id cua b khoi requestfriend cua a
            const existRequestUser = await User.findOne({_id: userId, requestFriends: myId});
            if(existRequestUser){
                await User.updateOne({_id: userId},{
                    $pull: {requestFriends: myId},
                    $push: {friendList: {
                        user_id: myId,
                        room_chat_id: ""
                    }}
                });
            }
        })
        
    })
};