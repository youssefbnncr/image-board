const db = require("../model/queries");

const displayBoard = async (req, res) => {
  res.render("board");
};
module.exports = { displayBoard };
