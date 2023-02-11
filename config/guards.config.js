exports.ensureAuthenticated = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect("/auth/sign-in");
};
