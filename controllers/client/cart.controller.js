const Cart = require("../../models/cart.model");

module.exports.index = async (req,res) =>{
    res.render("client/pages/cart/index",{
        pageTitle: "Giỏ hàng"
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