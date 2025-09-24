//khai bao express
const express = require("express");
//import dotenv
require('dotenv').config();
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const app = express();
//su dung env
const port = process.env.PORT;
const database = require("./config/database")
database.connect();
//khai bao pug
app.set('views', './views');
app.set('view engine', 'pug');

//su dung file static
app.use(express.static("public"));

routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
