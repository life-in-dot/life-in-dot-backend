const mongoose = require("mongoose");
const joi = require("joi");
const joigoose = require("joigoose")(mongoose);

const joiUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  picture: joi.string().uri(),
  dateOfBirth: joi.string().required(),
  myJournals: joi.array().items(
    joi.string().meta({
      _mongoose: {
        type: "ObjectId",
        ref: "Journal",
      },
    }),
  ),
});

const userSchema = new mongoose.Schema(joigoose.convert(joiUserSchema));
const User = mongoose.model("User", userSchema);

module.exports = { User, joiUserSchema };
