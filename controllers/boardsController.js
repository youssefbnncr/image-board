const db = require("../model/queries");

const displayBoard = async (req, res) => {
  res.locals.categories = await db.getCategories();
  res.locals.boards = await db.getBoards();
  res.render("board");
};
module.exports = { displayBoard };
