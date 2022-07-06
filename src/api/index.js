const { Router } = require("express");

const morganMiddleware = require("./middlewares/morganMiddleware");

const login = require("./routes/login");
const users = require("./routes/users");

module.exports = () => {
  const app = Router();

  app.use(morganMiddleware);

  login(app);
  users(app);

  return app;
};
