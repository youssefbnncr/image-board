const pool = require("./pool");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");

const signupValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username should be filled.")
    .isLength({ min: 5, max: 18 })
    .withMessage(
      "Username should be at least 5 characters and at most 18 characters.",
    )
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Username should only contain letters and numbers."),
  body("password")
    .notEmpty()
    .withMessage("Password should be filled.")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password should be between 8 and 32 characters long.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/)
    .withMessage("Password should include letters, numbers, and symbols."),
];

const signup = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (username, password, avatar, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
    [username, hashedPassword, "default.jpg"],
  );
};

const change_avatar = async (id, avatar) => {
  await pool.query("UPDATE users SET avatar = $1 WHERE id = $2", [avatar, id]);
};

/*const getAdmin = async (id) => {
  await pool.query("UPDATE users SET ")
} */

module.exports = { signup, signupValidation, change_avatar };
