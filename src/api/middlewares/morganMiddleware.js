const morgan = require("morgan");
const logger = require("../../loaders/logger");

const skip = () => {
  const isDevelopment = process.env.NODE_ENV !== "production";

  return !isDevelopment;
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream: logger.stream, skip },
);

module.exports = morganMiddleware;
