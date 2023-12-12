const { validateMongodbId } = require("../config/validateMongoDbId");
const NewsLetter = require("../models/newsletterModel");
const asyncHandler = require("express-async-handler");

//POST
const subscribe = asyncHandler(async (req, res) => {
  try {
    const newEmail = await NewsLetter.create(req.body);
    res.status(200).json({
      status: true,
      message: "Subscribed To NewsLetter",
      newEmail,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unsubscribe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteEmail = await NewsLetter.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: true, message: "User Unsubscribed to Newsletter" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { subscribe, unsubscribe };
