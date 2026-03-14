
const moment = require("moment");
const Order = require("../../models/order.model");
const dateFormat = require('dateformat').default;
const querystring = require('qs');
const crypto = require("crypto"); 
const sortObject = (obj) => {
    const sorted = {};
    const keys = Object.keys(obj).sort();

    keys.forEach((key) => {
        sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
    });

    return sorted;
};
module.exports.index = async (req,res) => {
    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    let vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;

    const ipAddr = "127.0.0.1";

    const createDate = moment().format("YYYYMMDDHHmmss");
    const expireDateFormat = moment().add(15, "minutes").format("YYYYMMDDHHmmss");

    const order = await Order.findOne({_id: req.params.orderId});
    const orderId = order._id.toString();
    const amount = Math.round(
        order.products.reduce((sum, item) => {
            return sum + ((1-item.discountPercentage/100)*item.price*item.quantity);
        },0)
    );

    const orderInfo = "Noi dung thanh toan";
    const orderType = "other";

    const locale = "vn";
    const currCode = 'VND';

    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_ExpireDate'] = expireDateFormat;

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;

    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    console.log(vnp_Params);
    console.log(vnpUrl);
    res.redirect(vnpUrl);
}
module.exports.returnPayment = async (req,res) => {
    let vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    const secretKey = process.env.VNP_HASH_SECRET;
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");    
        

    if(secureHash === signed){
        const orderId = vnp_Params['vnp_TxnRef'];
        const rspCode = vnp_Params['vnp_ResponseCode'];
        console.log(orderId);
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        if(rspCode === "00"){
            await Order.updateOne({_id: orderId},{$set: {paymentMethod: "vnpay", paymentStatus: "paid"}});
            res.redirect(`/checkout/success/${orderId}`);
        } else {
            res.send("Thanh toán thất bại");
        }
    }
    else {
        res.send("Sai chữ ký");
    }
}