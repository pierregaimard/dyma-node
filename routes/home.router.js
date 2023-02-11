const router = require("express").Router();
const { home } = require("../controllers/home.controller");
const { ensureAuthenticated } = require("../config/guards.config");

router.get("/", ensureAuthenticated, home);

module.exports = router;
