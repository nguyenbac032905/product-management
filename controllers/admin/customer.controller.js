const User = require("../../models/user.model");
const Room = require("../../models/room-chat.model");
module.exports.index = async (req,res) =>{
    let find = {
        deleted: false
    };

    const records = await User.find(find).select("-password -token");
    for(const record of records){
        const myRoom = await Room.findOne({
            deleted: false,
            typeRoom: "group",
            "users.user_id": record._id
        });
        record.myRoomId = myRoom._id;
    }
    res.render("admin/pages/customer/index",{
        pageTitle: "Customer",
        records: records
    });
};