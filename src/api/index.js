const { Router } = require("express");

const morganMiddleware = require("./middlewares/morganMiddleware");

const login = require("./routes/login");

module.exports = () => {
  const app = Router();

  app.use(morganMiddleware);

  login(app);

  return app;
};
