const board = require('../controllers/boardControllers');
const { Router } = require('express');
const boardRouter = Router();

boardRouter.get('/:boardId', board.displayBoard);

module.exports = boardRouter