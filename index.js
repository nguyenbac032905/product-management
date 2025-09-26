//khai bao express
const express = require("express");
//khai báo method overide
const methodOverride = require('method-override');
//khai báo body parse
const bodyParser = require('body-parser');
//import dotenv
require('dotenv').config();
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const app = express();
//su dung env
const port = process.env.PORT;
const database = require("./config/database");

//nhúng file config 
const systemConfig = require("./config/system");

database.connect();

//sử dụng body parse
app.use(bodyParser.urlencoded())
//sử dụng ghi đè method
app.use(methodOverride('_method'))
//khai bao pug
app.set('views', './views');
app.set('view engine', 'pug');

app.locals.prefixAdmin = systemConfig.prefixAdmin;
//su dung file static
app.use(express.static("public"));

routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
