const User = require("../database/models/user.model");

exports.findOneById = (id) => {
  return User.findById(id).exec();
};

exports.findOneByEmail = (email) => {
  return User.findOne({ "local.email": email }).exec();
};

exports.insertOne = (data) => {
  const user = new User({
    username: data.username,
    local: {
      email: data.email,
      password: data.password ? data.password : null,
      googleId: data.googleId ? data.googleId : null,
    },
  });

  return user.save();
};

exports.setAvatar = (userId, filename) => {
  return User.findByIdAndUpdate(
    { _id: userId },
    { $set: { avatar: filename } }
  ).exec();
};
