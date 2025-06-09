const db = require("../model/queries");
const createThread = async (req, res) => {
  try {
    const board_id = 4;
    const user_id = req.user.id;
    const { title, message } = req.body;
    const image = req.file.filename;
    await db.createThread(board_id, user_id, title, image, message);
    return res.status(200).redirect("/");
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error creating thread:", e);
  }
};

module.exports = { createThread };
