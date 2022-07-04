const { Router } = require("express");

const route = Router();

module.exports = app => {
  app.use("/login", route);
};
