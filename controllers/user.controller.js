const { insertOne, setAvatar } = require("../queries/user.queries");

exports.signUp = async (req, res, next) => {
  const errors = {};
  const data = req.body ? req.body : {};
  if (req.method === "POST") {
    try {
      const user = await insertOne(data);
      return req.login(user, (err) => {
        err ? next(err) : res.redirect("/tweet/list");
      });
    } catch (err) {
      if (!err.errors) {
        return next(err);
      }

      Object.keys(err.errors).forEach(
        (key) => (errors[key] = err.errors[key].message)
      );
    }
  }
  return res.render("user/sign-up", { errors, data: data });
};

exports.updateAvatar = async (req, res, next) => {
  if (req.file) {
    try {
      await setAvatar(req.user._id, req.file.filename);
    } catch (err) {
      next(err);
    }
  }

  return res.redirect("/");
};
