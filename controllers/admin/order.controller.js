const Order = require("../../models/order.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");
module.exports.index = async (req,res) =>{
    const orders = await Order.find({deleted: false});
    res.render("admin/pages/orders/index",{
        pageTitle: "Order",
        records: orders
    });
};
module.exports.detail = async (req,res) =>{
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
    res.render("admin/pages/orders/detail",{
        pageTitle: "Chi tiết",
        order: order
    });
};