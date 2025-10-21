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
//moment
const moment = require('moment');
app.locals.moment =moment;
//socket IO
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server);
global._io = io;
//end socket Io

routeAdmin(app);
route(app);
app.use((req,res) =>{
  res.status(404).render("client/pages/error/404",{
    pageTitle: "404 Not found"
  });
});


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
