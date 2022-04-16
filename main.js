const express = require("express");
const mongoose = require("mongoose");
const connectFlash = require("connect-flash");
const methodOverride = require("method-override");

app = express();

const passport = require ('passport');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const LocalStrategy = require('passport-local').Strategy;

const router =  require("./controllers/routes");
const layouts = require("express-ejs-layouts");
const dotenv = require("dotenv");

dotenv.config({path: './config.env'});

app.set("view engine", "ejs");

const port = process.env.PORT || 3000;


app.use(layouts);
app.set('layout', './layouts/full-width');
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


const DATABASE_LOCAL = process.env.DATABASE_LOCAL
mongoose.connect(
  DATABASE_LOCAL,
  { useNewUrlParser: true }
);


app.use(connectFlash());
app.use(cookieParser("secret_passcode"));
app.use(session({
  secret: "secret_passcode",
  resave: false,
  saveUninitialized: false,

  cookie : {
    maxAge: 40000
  }

}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 


app.use(router);


app.listen(port, () => {
  console.log(`Our Server running at http://localhost:${port}`);
});
