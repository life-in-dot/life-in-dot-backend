const mongoose = require("mongoose");
const joi = require("joi");
const joigoose = require("joigoose")(mongoose);

const joiJournalSchema = joi.object({
  dateId: joi.string().required(),
  title: joi.string().allow("").default(""),
  contents: joi.string().allow("").default(""),
  musicUrl: joi.string().allow("").default(""),
  albumCoverUrl: joi.string().allow("").default(""),
  contentsSize: joi.number(),
  lastSavedTime: joi.date().default(new Date()),
});

const journalSchema = new mongoose.Schema(joigoose.convert(joiJournalSchema));
const Journal = mongoose.model("Journal", journalSchema);

module.exports = { Journal, joiJournalSchema };
