
const express = require("express");
//import dotenv
require('dotenv').config();
const route = require("./routes/client/index.route");
const app = express();
//su dung env
const port = process.env.PORT;

//khai bao pug
app.set('views', './views');
app.set('view engine', 'pug');

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
