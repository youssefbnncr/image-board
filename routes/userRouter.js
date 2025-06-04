const user = require("../controllers/userControllers");
const { signupValidation } = require("../model/queries");
const { Router } = require("express");
const userRouter = Router();
const upload = require("../config/multerConfig");
const { isAdmin } = require("../config/authConfig");

userRouter.get("/register", user.signup);
userRouter.get("/login", user.signin);
userRouter.get("/log-out", user.logout);
userRouter.get("/user-settings", user.settings);
userRouter.get("/verify", user.getVerify);
userRouter.get("/admin", isAdmin, user.admin);

userRouter.post("/add-user", signupValidation, user.addUser);
userRouter.post("/userLogin", user.login);
userRouter.post("/log-out", user.logout);
userRouter.post("/change-avatar", upload.single("avatar"), user.change_avatar);
userRouter.post("/verify", user.postVerify);

module.exports = userRouter;
