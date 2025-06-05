const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 2) {
    return next();
  }
  res.status(403).send("go fuck your mom");
};

module.exports = { isAdmin };
