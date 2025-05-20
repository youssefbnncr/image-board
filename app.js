const path = require("node:path");
const express = require("express");

const app = express();
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));

const assetsPath = path.join(__dirname, "src/css");
app.use(express.static(assetsPath));
app.get("/",(req,res)=>res.render("index"))
app.listen(3000, () => console.log("app listening on port 3000!"));