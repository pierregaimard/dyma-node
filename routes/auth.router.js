const { Router, urlencoded } = require("express");
const { signIn, logOut } = require("../controllers/auth.controller");

const router = Router();
const bodyParser = urlencoded({ extended: false });

router.route("/sign-in").get(signIn).post(bodyParser, signIn);
router.get("/log-out", logOut);

module.exports = router;
