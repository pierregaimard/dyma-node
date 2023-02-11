const { Router, urlencoded } = require("express");
const upload = require("../config/multer.config");
const { signUp, updateAvatar } = require("../controllers/user.controller");
const { ensureAuthenticated } = require("../config/guards.config");

const router = Router();
const bodyParser = urlencoded({ extended: false });

router.route("/sign-up").get(signUp).post(bodyParser, signUp);
router.post(
  "/update/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  updateAvatar
);

module.exports = router;
