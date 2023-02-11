const router = require("express").Router();
const { ensureAuthenticated } = require("../config/guards.config");
const tweetRouter = require("./tweet.router");
const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const homeRouter = require("./home.router");

router.use("/tweet", ensureAuthenticated, tweetRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/", homeRouter);

module.exports = router;
