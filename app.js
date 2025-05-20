const path = require("node:path");
const express = require("express");

const userRouter = require('./routes/userRouter')

const app = express();
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));

const assetsPath = path.join(__dirname, "src/css");
app.use(express.static(assetsPath));

app.use('/user/',userRouter);
app.get('/',(req,res)=>res.render("index"))


app.listen(3000, () => console.log(`Server is running at: http://localhost:3000`));