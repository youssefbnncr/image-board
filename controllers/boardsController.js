const db = require("../model/queries");

const displayBoard = async (req, res) => {
  try {
    const results = await db.getBoards();
    res.locals.categories = await db.getCategories();
    let v = false;
    const tag = req.params.tag;
    results.forEach((result) => {
      if (tag === result.tag) {
        res.locals.board = result;
        v = true;
      }
    });
    if (v == true) {
      res.locals.boards = results;
      const threads = await db.getThreads();
      res.locals.threads = threads;
      return res.status(200).render("board");
    }
    return res.status(404).render("not_found");
  } catch (e) {
    console.error("Error fetching boards:", e);
    res.status(500).send("Error fetching boards data.");
  }
};
module.exports = { displayBoard };
