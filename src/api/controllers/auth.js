const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/User");

const catchAsync = require("../../utils/asyncHandler");
const config = require("../../config");

exports.login = catchAsync(async (req, res, next) => {
  const { name, email, picture, dateOfBirth } = req.body;

  if (!name || !email || !dateOfBirth) {
    return next(createError(401));
  }

  let userData = await User.findOne({ email });

  if (!userData) {
    userData = User.create({
      name,
      email,
      picture,
      dateOfBirth,
    });
  }

  const userPayload = {
    name: userData.name,
    email: userData.email,
  };

  const accessToken = jwt.sign(userPayload, config.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.json({
    result: "ok",
    data: {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
      dateOfBirth: userData.dateOfBirth,
    },
    accessToken,
  });
});
