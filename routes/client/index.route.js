//import routes để sử dụng
const productRoutes = require("./products.route");
const homeRoutes = require("./home.route");

module.exports = (app) => {

  app.use("/",homeRoutes);
  //truyền /products vào productRoutes
  app.use("/products", productRoutes);

};
