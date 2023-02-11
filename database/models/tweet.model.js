const { Schema, model } = require("mongoose");

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Oups! le tweet est vide"],
      minLength: [3, "Un tweet doit faire au moins 3 caractères"],
      maxLength: [140, "Un tweet ne peut pas dépasser 140 caractères"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Twit = model("tweet", tweetSchema);

module.exports = Twit;
