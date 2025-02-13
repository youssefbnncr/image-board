const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
require('dotenv').config();

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'src');
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const userRouter = require('./routes/userRouter');
app.use('/', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});