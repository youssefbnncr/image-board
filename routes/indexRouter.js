const indexController = require("../controllers/indexControllers");
const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", indexController.displayCategories);

module.exports = indexRouter;
