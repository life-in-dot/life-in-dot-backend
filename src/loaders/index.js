const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

const logger = require("./logger");

module.exports = async ({ expressApp }) => {
  await mongooseLoader();
  logger.info("🌱 MongoDB connected!");

  await expressLoader(expressApp);
  logger.info("🌲 Express loaded!");
};
