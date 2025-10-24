const User = require("../../models/user.model");
module.exports = (res) =>{
    _io.once("connection", (socket) =>{
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
        })
        socket.on("CLIENT_CANCEL_FRIEND", async (userId) =>{
            const myId = res.locals.user.id;
            
            //xoa id cua a khoi acceptfriend cua b
            const existAcceptUser = await User.findOne({_id: userId, acceptFriends: myId});
            if(existAcceptUser){
                await User.updateOne({_id: userId},{$pull: {acceptFriends: myId}});
            }
            //xoa id cua b khoi requestfriend cua a
            const existRequestUser = await User.findOne({_id: userId, requestFriends: userId});
            if(existAcceptUser){
                await User.updateOne({_id: myId},{$pull: {requestFriends: userId}});
            }
        })
        
    })
};