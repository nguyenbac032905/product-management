//import routes để sử dụng
const productRoutes = require("./products.route");
const homeRoutes = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");

module.exports = (app) => {
  app.use(categoryMiddleware.category)
  app.use("/",homeRoutes);
  //truyền /products vào productRoutes
  app.use("/products", productRoutes);

};
