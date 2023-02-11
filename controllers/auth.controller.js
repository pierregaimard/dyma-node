const passport = require("passport");

exports.signIn = (req, res, next) => {
  if (req.method === "GET") {
    return res.render("auth/sign-in");
  }

  passport.authenticate("local", (err, user, data) => {
    if (err) {
      return next(err);
    }

    if (user) {
      return req.login(user, (err) => {
        err ? next(err) : res.redirect("/");
      });
    }

    res.render("auth/sign-in", { error: data.message, email: req.body.email });
  })(req, res, next);
};

exports.logOut = (req, res, next) => {
  return req.logout((err) => {
    err ? next(err) : res.redirect("/");
  });
};
