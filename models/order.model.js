const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    // user_id: String,
    cart_id: String,
    userInfo: {
      fullName: String,
      phone: String,
      address: String,  
    },
    products:[
        {
            product_id:String,
            price: Number,
            quantity: Number,
            discountPercentage: Number
        }
    ],
    coupon:{
        coupon_id: String,
        coupon_code: String,
        discountType: String,
        discountValue: Number,
        discountAmount: Number
    },
    status: {
        type: String,
        default: "initial"
    },
    paymentMethod: {
        type: String,
        default: "cod"
    },
    paymentStatus: {
        type: String,
        default: "pending"
    },
    deleted:{
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
});
const Order = mongoose.model("Order",orderSchema,"orders");
module.exports = Order;