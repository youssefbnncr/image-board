const boardsController = require("../controllers/boardsController");
const { Router } = require("express");
const boardsRouter = Router();

boardsRouter.get("/", boardsController.displayBoard);

module.exports = boardsRouter;
