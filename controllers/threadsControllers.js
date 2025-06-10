const db = require("../model/queries");
const createThread = async (req, res) => {
  try {
    const tag = req.params.tag;
    const board_id = await db.getBoardId(tag);
    const user_id = req.user.id;
    const { title, message } = req.body;
    const image = req.file.filename;
    await db.createThread(board_id.id, user_id, title, image, message);
    return res.status(200).redirect(`/board/${tag}`);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error creating thread:", e);
  }
};

module.exports = { createThread };
