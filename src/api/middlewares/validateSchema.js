const createError = require("http-errors");
const logger = require("../../loaders/logger");

module.exports = function validateSchema(schema, property) {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      next(createError(400));
      logger.error(error);
    }

    next();
  };
};
