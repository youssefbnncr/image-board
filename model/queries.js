const pool = require("./pool");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");

// Signup Validation
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

// Users
const signup = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, password, avatar, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
      [username, hashedPassword, "default.jpg"],
    );
  } catch (e) {
    console.error("Error creating user:", e);
    throw e;
  }
};

const updateUserAvatar = async (id, avatar) => {
  try {
    await pool.query("UPDATE users SET avatar = $1 WHERE id = $2", [
      avatar,
      id,
    ]);
  } catch (e) {
    console.error("Error updating avatar:", e);
    throw e;
  }
};

const getUsers = async () => {
  try {
    const result = await pool.query(
      "SELECT id, username, created_at, role FROM users ORDER BY id ASC",
    );
    return result.rows;
  } catch (e) {
    console.error("Error getting users:", e);
    throw e;
  }
};

const updateUsersRole = async (id, role) => {
  try {
    await pool.query("UPDATE users SET role = $1 WHERE id = $2", [role, id]);
  } catch (e) {
    console.error("Error updating role:", e);
    throw e;
  }
};

// Categories
const createCategory = async (name) => {
  try {
    const result = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name],
    );
    return result.rows[0];
  } catch (e) {
    console.error("Error creating category:", e);
    throw e;
  }
};

const updateCategory = async (id, name) => {
  try {
    const result = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, id],
    );
    return result.rows[0];
  } catch (e) {
    console.error("Error updating category:", e);
    throw e;
  }
};

const getCategories = async () => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id");
    return result.rows;
  } catch (e) {
    console.error("Error getting categories:", e);
    throw e;
  }
};

const deleteCategory = async (id) => {
  try {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  } catch (e) {
    console.error("Error deleting category:", e);
    throw e;
  }
};

// Boards
const createBoard = async (name, category_id, created_by) => {
  try {
    const result = await pool.query(
      "INSERT INTO boards (name, category_id, created_by) VALUES ($1, $2, $3) RETURNING *",
      [name, category_id, created_by],
    );
    return result.rows[0];
  } catch (e) {
    console.error("Error creating board:", e);
    throw e;
  }
};

const getBoards = async () => {
  try {
    const result = await pool.query("SELECT * FROM boards ORDER BY id");
    return result.rows;
  } catch (e) {
    console.error("Error getting boards:", e);
    throw e;
  }
};

const updateBoard = async (id, name, category_id) => {
  try {
    const result = await pool.query(
      "UPDATE boards SET name = $1, category_id = $2 WHERE id = $3 RETURNING *",
      [name, category_id, id],
    );
    return result.rows[0];
  } catch (e) {
    console.error("Error updating board:", e);
    throw e;
  }
};

const deleteBoard = async (id) => {
  try {
    await pool.query("DELETE FROM boards WHERE id = $1", [id]);
  } catch (e) {
    console.error("Error deleting board:", e);
    throw e;
  }
};

module.exports = {
  signup,
  signupValidation,
  updateUserAvatar,
  getUsers,
  updateUsersRole,
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
};
