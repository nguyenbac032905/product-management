const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");

module.exports.index = async (req,res) =>{
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
    res.render("client/pages/cart/index",{
        pageTitle: "Giỏ hàng",
        products: newProducts
    });
};
module.exports.addPost = async (req,res) => {
    try {
        const productId = req.params.productId;
        const quantity = req.body.quantity;
        const cartId = req.cookies.cartId;

        const addProduct = {
            product_id: productId,
            quantity: quantity
        };
        
        const cart = await Cart.findOne({_id: cartId});
        const existProduct = cart.products.find(item => item.product_id == productId);
        if(existProduct){
            const newQuantity = parseInt(quantity) + existProduct.quantity;
            await Cart.updateOne({_id: cartId, "products.product_id":productId},
                {
                    $set:{
                        "products.$.quantity": newQuantity
                    }
                });
            
        }else{
            await Cart.updateOne({_id: cartId},{$push: {products: addProduct}});
        }
        req.flash("success","cập nhật thành công");
    } catch (error) {
        req.flash("error","cập nhật thất bại");
    }
    res.redirect("/cart");
};