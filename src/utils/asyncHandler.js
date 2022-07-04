const logger = require("../loaders/logger");

module.exports = asyncFunction => {
  return async (req, res, next) => {
    try {
      await asyncFunction(req, res, next);
    } catch (error) {
      logger.error(error);

      next(error);
    }
  };
};
