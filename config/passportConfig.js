const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../model/pool");

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = result.rows[0];

      if (!user)
        return done(null, false, {
          message: "username or password is incorrect.",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "username or password is incorrect",
        });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query(
        "SELECT id, username, role, avatar FROM users WHERE id = $1",
        [id],
      );
      done(null, result.rows[0]);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initialize;
