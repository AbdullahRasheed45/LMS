const QnaTag = require("../../models/qna/tagModel");
const {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll,
} = require("../customCtrl");

const postTag = createOne(QnaTag);
const updateTag = updateOne(QnaTag);
const deleteTag = deleteOne(QnaTag);
const getTag = getOne(QnaTag);
const getAllTag = getAll(QnaTag);

module.exports = { postTag, updateTag, deleteTag, getTag, getAllTag };
