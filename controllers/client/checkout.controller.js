const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");
const Order = require("../../models/order.model");
const Coupon = require("../../models/coupon.model");

module.exports.index = async (req,res) => {
    const cartId = req.cookies.cartId;
        const cart = await Cart.findOne({_id: cartId});
        const products = [];
    
        if(cart.products.length > 0){
            const productsInCart = cart.products;
            for(item of productsInCart){
                const product = await Product.findOne({
                    _id: item.product_id
                }).select("title thumbnail slug price discountPercentage");
                product.quantity = item.quantity;
                products.push(product);
            }
        }
        
        const newProducts = productHelper.newPrice(products);
        newProducts.cartTotalPrice = newProducts.reduce((sum,item) => {
            return sum + item.quantity*item.priceNew;
        },0);
    res.render("client/pages/checkout/index",{
        pageTitle: "Thanh toán",
        products: newProducts
    });
};
module.exports.orderPost = async (req,res) =>{
    const paymentMethod = req.body.paymentMethod;
    const couponCode = req.body.coupon;
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({_id: cartId});
    const products = [];

    //xử lí thông tin product
    for(const product of cart.products){
        const objectProduct = {
            product_id: product.product_id,
            price: 0,
            quantity: product.quantity,
            discountPercentage: 0
        };
        const productInfo = await Product.findOne({_id: product.product_id}).select("price discountPercentage");
        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;
        products.push(objectProduct);
    }

    //xử lí thông tin coupon
    const totalOrder = products.reduce((sum,item) => {
        return sum + item.price*item.quantity*(1-item.discountPercentage/100);
    },0);
    let couponData = null;
    if(couponCode){
        const couponInfo = await Coupon.findOne({code: couponCode.toLowerCase(),deleted: false, status: "active"});
        if(!couponInfo){
            req.flash("error", `Không tồn tại mã giảm giá này`);
            res.redirect(req.get("Referer"));
            return;
        }
        if(couponInfo.minOrderValue != null && totalOrder < couponInfo.minOrderValue){
            req.flash("error", `giá trị tối thiểu là ${couponInfo.minOrderValue} để dùng mã giảm giá này`);
            res.redirect(req.get("Referer"));
            return;
        }
        let discountAmount = 0
        if(couponInfo.discountType == "percent"){
            discountAmount = totalOrder*couponInfo.discountValue/100;
            if(couponInfo.maxDiscount){
                discountAmount = Math.min(discountAmount,couponInfo.maxDiscount);
            }
        }else{
            discountAmount = couponInfo.discountValue;
            if(couponInfo.maxDiscount){
                discountAmount = Math.min(discountAmount,couponInfo.maxDiscount);
            }
        }
        couponData = {
            coupon_id: couponInfo._id,
            coupon_code: couponInfo.code,
            discountType: couponInfo.discountType,
            discountValue: couponInfo.discountValue,
            discountAmount: discountAmount
        }
    }
    const order = new Order({
        cart_id: cartId,
        userInfo: {
            fullName: req.body.fullName,
            phone: req.body.phone,
            address: req.body.address
        },
        products: products,
        coupon:couponData
    });
    order.save();
    await Cart.updateOne({_id: cartId},{products: []});
    if(paymentMethod == "vnpay"){
        res.redirect(`/payment/create_payment_url/${order.id}`);
        return;
    }
    res.redirect(`/checkout/success/${order.id}`);
};
module.exports.success = async(req,res) =>{
    const orderId = req.params.orderId;
    const order = await Order.findOne({_id: orderId});

    for(const product of order.products){
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("title thumbnail");
        product.productInfo = productInfo;
        product.newPrice = productHelper.newPriceProduct(product);
        product.totalPrice = product.newPrice* product.quantity;
    }
    order.orderTotalPrice = order.products.reduce((sum,item) => sum+item.totalPrice,0);
    res.render("client/pages/checkout/success",{
        pageTitle: "success",
        order: order
    });
};