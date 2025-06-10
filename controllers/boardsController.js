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
      const boardId = await db.getBoardId(tag);
      const threads = await db.getThreads(boardId.id);
      console.log(boardId.id);
      res.locals.threads = threads;
      res.locals.boards = results;
      res.locals.tag = tag;
      return res.status(200).render("board");
    }
    return res.status(404).render("404");
  } catch (e) {
    console.error("Error fetching boards:", e);
    res.status(500).send("Error fetching boards data.");
  }
};
module.exports = { displayBoard };
