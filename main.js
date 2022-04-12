const express = require("express");
const app = express();
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true});

app.use(connectFlash());
app.use(cookieParser("my_secret_code"));
app.use(expressSession({
    secret : "my_secret_code",
    cookie: {
        maxAge : 4000000
    },
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require('./routes/users');
app.use(userRoutes);

const port = process.env.PORT;
app.listen(port, ()=>console.log("Démarré!! sur le Port " + port));