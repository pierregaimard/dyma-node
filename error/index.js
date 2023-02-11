const errorHandler = require("errorhandler");
const app = require("../app");

app.use((req, res) => {
  res.render("error/error", {
    error: {
      code: 404,
      message: `Not found url ${req.url}`,
    },
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

if (process.env.NODE_ENV === "production") {
  app.use((err, req, res) => {
    res.render("error/error", {
      error: {
        code: err.code,
        message: err.code === 500 ? "Erreur serveur" : err.message,
      },
    });
  });
}
