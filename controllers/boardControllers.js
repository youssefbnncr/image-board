const db = require("../model/queries");


const displayBoard =  (req,res) => {
    const boardId = req.params;
    res.send(boardId)
}

module.exports = {
    displayBoard,
}