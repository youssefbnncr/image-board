// Express
const path = require("node:path");
const express = require("express");
// Passport
const passport = require("passport");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const initializePassport = require("./config/passportConfig");
// Flash
const flash = require("connect-flash");
// DB
const pool = require("./model/pool");
require("dotenv").config();
// Routers
const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/indexRouter");
const boardsRouter = require("./routes/boardsRouter");
const threadsRouter = require("./routes/threadsRouter");
// App starts
const app = express();

initializePassport(passport);
app.use(
  session({
    store: new pgSession({
      pool: pool,
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    rolling: true,
    secret: `${process.env.session_password}`,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.session());
app.use(flash());
// View Engine
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");
// Accept form data
app.use(express.urlencoded({ extended: false }));
// CSS
const assetsPath = path.join(__dirname, "src/assets");
app.use(express.static(assetsPath));

app.use("/avatar", express.static(path.join(__dirname, "uploads/avatar")));
app.use("/posts", express.static(path.join(__dirname, "uploads/posts")));

app.use((req, res, next) => {
  res.locals.error_messages = req.flash("error");
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use("/user/", userRouter);
app.use("/threads/", threadsRouter);
app.use("/board/", boardsRouter);
app.use("/", indexRouter);

app.use((req, res) => res.render("404"));

app.listen(3000, () =>
  console.log(`Server is running at: http://localhost:3000`),
);
