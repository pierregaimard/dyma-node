const {
  findAll,
  insertOne,
  updateOne,
  deleteOne,
  findOneById,
} = require("../queries/tweet.queries");

exports.list = async (req, res, next) => {
  try {
    const tweets = await findAll();
    res.render("tweet/list", { tweets, user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const errors = {};
  const data = { ...req.body, author: req.user._id };
  if (req.method === "POST") {
    try {
      await insertOne(data);
      return res.redirect("/tweet/list");
    } catch (err) {
      if (!err.errors) {
        return next(err);
      }

      Object.keys(err.errors).forEach(
        (key) => (errors[key] = err.errors[key].message)
      );
    }
  }
  console.log(errors);
  return res.render("tweet/edit", { errors, user: req.user });
};

exports.edit = async (req, res, next) => {
  const errors = {};
  let tweet;

  try {
    if (req.method === "POST") {
      await updateOne(req.params.tweetId, req.body);
      return res.redirect("/");
    }

    tweet = await findOneById(req.params.tweetId);
  } catch (err) {
    if (!err.errors) {
      next(err);
    }

    Object.keys(err.errors).forEach(
      (key) => (errors[key] = err.errors[key].message)
    );
  }

  res.render("tweet/edit", { tweet, errors, user: req.user });
};

exports.remove = async (req, res, next) => {
  try {
    await deleteOne(req.params.tweetId);
    const tweets = await findAll();

    return res.render("tweet/_list", { tweets });
  } catch (err) {
    next(err);
  }
};
