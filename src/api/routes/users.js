const { Router } = require("express");

const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

const { joiJournalSchema } = require("../../models/Journal");

const verifyToken = require("../middlewares/verifyToken");
const validateSchema = require("../middlewares/validateSchema");
const UserController = require("../controllers/user");

const route = Router();

module.exports = app => {
  app.use("/users", verifyToken, route);

  route.get(
    ":user_id/journals",
    validateSchema(
      joi.object({ user_id: joi.objectId().required() }),
      "params",
    ),
    UserController.getUserAllJournals,
  );
};
