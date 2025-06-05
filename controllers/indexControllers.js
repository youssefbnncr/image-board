const db = require("../model/queries");

const displayCategories = async (req, res) => {
  try {
    res.locals.categories = await db.getCategories();
    res.locals.boards = await db.getBoards();
    res.render("index");
  } catch (e) {
    console.error(e);
    res.status(500).send("Cannot fetch categories: ", e);
  }
};

module.exports = {
  displayCategories,
};
