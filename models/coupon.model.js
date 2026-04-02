const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: String,
    description: String,
    discountType: String,
    discountValue: Number,
    maxDiscount: {
        type: Number,
        default: null
    },
    minOrderValue: {
        type: Number,
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    },
    startDate: Date,
    endDate: Date,
    status: String,
    createdAt: Date,
    updatedAt: Date
},{
    timestamps: true
});

const Coupon = mongoose.model("Coupon",couponSchema, "coupons");
module.exports = Coupon;