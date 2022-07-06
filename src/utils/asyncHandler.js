const logger = require("../loaders/logger");

const catchAsync = asyncFunction => {
  return async (req, res, next) => {
    try {
      await asyncFunction(req, res, next);
    } catch (error) {
      logger.error(error);

      next(error);
    }
  };
};

module.exports = catchAsync;
