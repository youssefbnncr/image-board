const db = require("../model/queries");

const displayCategories = async (req, res) => {
  res.locals.isLoged = req.isAuthenticated();
  res.locals.user = req.user;
  try {
    res.locals.categories = await db.getCategories();
    res.locals.boards = await db.getBoards();
    res.render("index");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error Fetching Categories and Boards : ", e);
  }
};

module.exports = {
  displayCategories,
};
