//khai bao express
const express = require("express");
//khai báo method overide
const methodOverride = require('method-override');
//khai báo body parse
const bodyParser = require('body-parser');
//khai báo express flash
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");
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
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
//sử dụng flash
app.use(cookieParser('diencookieoday'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.locals.prefixAdmin = systemConfig.prefixAdmin;
//su dung file static
app.use(express.static(`${__dirname}/public`));
//tiny MCE
var path = require('path');
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
