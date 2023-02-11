const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = require("../app");
const env = require(`../env/${process.env.NODE_ENV}`);

app.use(
  session({
    name: "_usid",
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 2, // 2 jours
    },
    store: new MongoStore({
      mongoUrl: env.dbURL,
      ttl: 60 * 60 * 24 * 2, // 2 jours
    }),
  })
);
