const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 2) {
    return next();
  }
  res.status(403).send("You can't access this page unless you\'r admin.");
};

module.exports = { isAdmin };
