const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { startSession } = require("mongoose");

const { User } = require("../../models/User");
const { Journal } = require("../../models/Journal");

const catchAsync = require("../../utils/asyncHandler");

exports.getUserAllJournals = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;

  const userData = await User.findOne({ _id: user_id })
    .populate("myJournals")
    .lean();

  const userJournals = userData.myJournals;

  return res.status(200).json({
    result: "ok",
    data: [...userJournals],
  });
});

exports.getUserJournal = catchAsync(async (req, res, next) => {
  const { journal_id } = req.params;

  const userJournal = await Journal.findOne({ _id: journal_id }).lean();

  delete userJournal.__v;

  return res.status(200).json({
    result: "ok",
    data: { ...userJournal },
  });
});

exports.createJournal = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;
  const { dateId, title, contents } = req.body;
  const session = await startSession();
  let newJournal;

  await session.withTransaction(async () => {
    const userJournal = await Journal.findOne({ dateId });

    if (!userJournal) {
      const newJournalArr = await Journal.create(
        [
          {
            dateId,
            title,
            contents,
            contentsSize: contents.length,
          },
        ],
        { session },
      );

      newJournal = newJournalArr[0].toObject();
      delete newJournal.__v;

      await User.updateOne(
        { _id: user_id },
        { $push: { myJournals: newJournal._id } },
        { session },
      );
    } else {
      newJournal = userJournal;
    }
  });

  session.endSession();

  return res.status(200).json({
    result: "ok",
    data: { ...newJournal },
  });
});

exports.updateJournal = catchAsync(async (req, res, next) => {
  const { journal_id } = req.params;
  const { title, contents, contentsSize, musicUrl } = req.body;
  const lastSavedTime = Date.now();

  await Journal.findByIdAndUpdate(
    { _id: journal_id },
    { title, contents, musicUrl, contentsSize, lastSavedTime },
    { new: true },
  );

  return res.status(200).json({
    result: "ok",
  });
});

exports.replaceJournal = catchAsync(async (req, res, next) => {
  const { journal_id } = req.params;
  const { contents, contentsSize } = req.body;
  const lastSavedTime = Date.now();

  await Journal.findOneAndReplace(
    { _id: journal_id },
    { ...req.body, contentsSize, lastSavedTime },
    { new: true },
  );

  return res.status(201).json({
    result: "ok",
  });
});

exports.deleteJournal = catchAsync(async (req, res, next) => {
  const { user_id, journal_id } = req.params;
  const session = await startSession();

  await session.withTransaction(async () => {
    await User.updateOne(
      { _id: user_id },
      { $pull: { myJournals: journal_id } },
    );

    await Journal.findByIdAndDelete({ _id: journal_id });
  });

  session.endSession();

  return res.status(200).json({ result: "ok" });
});
