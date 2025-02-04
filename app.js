const express = require('express');
const app = express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "src");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});