const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const https = require("https");





const app = express();

require("dotenv").config();


app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(expressLayouts);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
app.use(fileUpload());


const routes = require("./server/routes/blogRoutes.js");
app.use("/", routes);


























app.listen(3000, function() {
  console.log("Server successfully started on port 3000");
});
