module.exports.newPrice = (products) => {
    const newProducts = products.map((item) => {
        item.priceNew = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
        return item;
    });
    return newProducts;
};

module.exports.newPriceProduct = (product) => {
    const newPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
    return newPrice;
};