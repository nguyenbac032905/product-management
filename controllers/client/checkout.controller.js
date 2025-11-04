const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");
const Order = require("../../models/order.model");

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
    const userInfo = req.body;
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({_id: cartId});
    const products = [];

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
    const order = new Order({
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    });
    order.save();
    await Cart.updateOne({_id: cartId},{products: []});

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