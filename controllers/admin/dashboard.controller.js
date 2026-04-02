const CategoryProduct = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const Account = require("../../models/account.model");
const User = require("../../models/user.model");
const Order = require("../../models/order.model");
// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0
        }
    };

    statistic.categoryProduct.total = await CategoryProduct.countDocuments({deleted: false});
    statistic.categoryProduct.active = await CategoryProduct.countDocuments({deleted: false,status: "active"});
    statistic.categoryProduct.inactive = await CategoryProduct.countDocuments({deleted: false,status: "inactive"});

    statistic.product.total = await Product.countDocuments({deleted: false});
    statistic.product.active = await Product.countDocuments({deleted: false,status: "active"});
    statistic.product.inactive = await Product.countDocuments({deleted: false,status: "inactive"});

    statistic.account.total = await Account.countDocuments({deleted: false});
    statistic.account.active = await Account.countDocuments({deleted: false,status: "active"});
    statistic.account.inactive = await Account.countDocuments({deleted: false,status: "inactive"});

    statistic.user.total = await User.countDocuments({deleted: false});
    statistic.user.active = await User.countDocuments({deleted: false,status: "active"});
    statistic.user.inactive = await User.countDocuments({deleted: false,status: "inactive"});

    res.render("admin/pages/dashboard/index",{
        pageTitle:  "dashboard",
        statistic: statistic
    }
    )
}
module.exports.revenueCategory = async (req,res) => {
    const now = new Date();
    const filterValue = req.query.filter;
    const filterKey = {
        day: 1,
        week: 7,
        month: 30,
        quarter: 90
    };
    const startDate = new Date(now.setDate(now.getDate() - filterKey[filterValue]));

    const data = await Order.aggregate([
        {
            $match: {
                deleted: false,
                createdAt: {$gte: startDate}
            }
        },
        {
            $unwind: "$products"
        },
        {
            $addFields:{
                "products.product_id":{
                    $toObjectId: "$products.product_id"
                }
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "products.product_id",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        {
            $unwind: "$productInfo"
        },
        {
            $addFields:{
                "productInfo.product_category_id":{
                    $toObjectId: "$productInfo.product_category_id"
                }
            }
        },
        {
            $lookup: {
                from: "product-category",
                localField: "productInfo.product_category_id",
                foreignField: "_id",
                as: "categoryInfo"
            }
        },
        {
            $unwind: "$categoryInfo"
        },
        {
            $group:{
                _id: "$categoryInfo.title",
                revenue: {
                    $sum: {
                        $multiply: [
                            "$products.price",
                            "$products.quantity",
                            {
                                $subtract: [
                                    1,
                                    {$divide: ["$products.discountPercentage",100]}
                                ]
                            }
                        ]
                    }
                }
            }
        }
    ]);
    res.json({
        message: "200",
        data: data
    })
}