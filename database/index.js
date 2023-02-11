const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const env = require(`../env/${process.env.NODE_ENV}`);

const connectDB = async () => {
  try {
    await mongoose.connect(env.dbURL);

    console.log("DB connection is up");
  } catch (err) {
    console.log(err);
  }
};

connectDB();
