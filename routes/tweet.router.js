const { Router, urlencoded } = require("express");
const {
  list,
  create,
  remove,
  edit,
} = require("../controllers/tweet.controller");
const router = Router();

const bodyParser = urlencoded({ extended: false });

router.get("/list", list);
router.route("/new").get(create).post(bodyParser, create);
router.route("/edit/:tweetId").get(edit).post(bodyParser, edit);
router.delete("/:tweetId", remove);

module.exports = router;
