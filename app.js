const path = require("node:path");
const express = require("express");
const passport = require("passport");
const session = require('express-session');
const pgSession = require("connect-pg-simple")(session);
const flash = require('connect-flash');

const pool = require('./model/pool')
const initializePassport = require('./config/passportConfig');
require('dotenv').config();

const userRouter = require('./routes/userRouter')
const boardRouter = require('./routes/boardRouter')

const app = express();

initializePassport(passport);
app.use(session({
    store: new pgSession({
      pool: pool,
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    rolling: true,
 	secret: `${process.env.session_password}`,
	resave: false,
	saveUninitialized: false,
}));

app.use(passport.session());
app.use(flash());

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));

const assetsPath = path.join(__dirname, "src/css");
app.use(express.static(assetsPath));

app.use('/uploads/avatars', express.static(path.join(__dirname, 'uploads/avatars')));


app.use((req,res,next)=>{
  res.locals.error_messages = req.flash('error');
  next();
})

app.use((req, res, next) => {
    res.locals.isLoged = req.isAuthenticated();
    res.locals.user = req.user;
    next();
});

app.use('/user/',userRouter);
app.use('/board/',boardRouter)
app.get('/',(req,res)=>res.render("index"))

app.listen(3000, () => console.log(`Server is running at: http://localhost:3000`));