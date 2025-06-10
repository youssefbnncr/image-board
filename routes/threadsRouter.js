const threadsController = require("../controllers/threadsControllers");
const { Router } = require("express");
const threadsRouter = Router();
const { uploadPost } = require("../config/multerConfig");

threadsRouter.post(
  "/createThread/:tag",
  uploadPost,
  threadsController.createThread,
);

module.exports = threadsRouter;
