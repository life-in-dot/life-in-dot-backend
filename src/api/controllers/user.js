const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { Journal } = require("../../models/Journal");

const catchAsync = require("../../utils/asyncHandler");

exports.getUserAllJournals = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;

  return res.status(200).json({
    result: "ok",
    data: [],
  });
});
