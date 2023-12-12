const BookSession = require("../models/sessionModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll,
} = require("./customCtrl");

const postSession = createOne(BookSession);
const getAllSession = getAll(BookSession);
const getASession = getOne(BookSession);
const updateASession = updateOne(BookSession);
const deleteASession = deleteOne(BookSession);

module.exports = {
  postSession,
  getASession,
  getAllSession,
  updateASession,
  deleteASession,
};
