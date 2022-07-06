const { Router } = require("express");

const { joiUserSchema } = require("../../models/User");

const validateSchema = require("../middlewares/validateSchema");
const AuthController = require("../controllers/auth");

const route = Router();

module.exports = app => {
  app.use("/login", route);

  route.post("/", validateSchema(joiUserSchema, "body"), AuthController.login);
};
