const Tweet = require("../database/models/tweet.model");

exports.findAll = () => {
  return Tweet.find({}).exec();
};

exports.findOneById = (id) => {
  return Tweet.findById(id).exec();
};

exports.insertOne = (data) => {
  const tweet = new Tweet(data);

  return tweet.save();
};

exports.updateOne = (id, data) => {
  return Tweet.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { runValidators: true }
  ).exec();
};

exports.deleteOne = (id) => {
  return Tweet.findOneAndDelete({ _id: id }).exec();
};
