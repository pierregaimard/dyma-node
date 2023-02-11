const path = require("path");
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

module.exports = app;

require("./database");
require("./config/session.config");
require("./config/passport.config");

app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(router);

require("./error");
