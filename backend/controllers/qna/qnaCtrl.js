const { default: slugify } = require("slugify");
const { validateMongodbId } = require("../../config/validateMongoDbId");
const Question = require("../../models/qna/QuestionModel");
const Answer = require("../../models/qna/answerModel");
const QnaTag = require("../../models/qna/tagModel");
const Qnacomment = require("../../models/qna/qnaComment");
const Qna = require("../../models/qna/qnaModel");
const asyncHandler = require("express-async-handler");
const { getOne, getAll, updateOne } = require("../customCtrl");

const createPost = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (req.body.tags) {
      req.body.tags.forEach(async (element) => {
        const updateTagCounter = await QnaTag.findByIdAndUpdate(
          element,
          {
            $inc: { totalquestion: +1 },
          },
          { new: true }
        );
      });
    }
    const newQuestion = await Question.create(req.body);
    const post = await Qna.create({
      user: id,
      question: newQuestion?._id,
      slug: req.body.slug,
    });
    res.status(200).json({
      status: true,
      message: "New Question is Posted",
      newQuestion,
      post,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAQuestion = getOne(Qna, "question answer");

const getAllQuestion = getAll(Qna, "question answer");

const deleteQuestion = asyncHandler(async (req, res) => {
  const { postId, questionId, ansId } = req.params; // Changed quesId to questionId
  validateMongodbId(postId);
  validateMongodbId(questionId); // Changed quesId to questionId
  if (ansId && ansId !== "null") {
    validateMongodbId(ansId);
  }
  try {
    const deletePost = await Qna.findByIdAndDelete(postId);
    const deleteQuestion = await Question.findByIdAndDelete(questionId); // Changed deleteQues to deleteQuestion
    if (ansId && ansId !== "null") {
      await Answer.findByIdAndDelete(ansId);
    }
    res.status(200).json({
      status: true,
      message: "Question Deleted Successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const createAnswer = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { postId } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const data = {
      user: id,
      ...req.body,
    };
    const answer = await Answer.create(req.body);
    const post = await Qna.findByIdAndUpdate(
      postId,
      {
        answer: answer?._id,
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "New Question is Updated Successfully!",
      answer,
      post,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateQuestion = updateOne(Question);
const updateAnswer = updateOne(Answer);

const addComment = asyncHandler(async (req, res) => {
  const { quesId } = req.params;
  const { id } = req.user;
  validateMongodbId(quesId);
  validateMongodbId(id);
  try {
    const createComment = await Qnacomment.create({
      user: id,
      comment: req.body.comment,
    });
    const findQuestion = await Question.findByIdAndUpdate(
      quesId,
      {
        $push: { comments: createComment._id },
      },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Comment Posted!" });
  } catch (error) {
    throw new error();
  }
});
const deleteComment = asyncHandler(async (req, res) => {
  const { quesId, commentId } = req.params;
  const { id } = req.user;
  validateMongodbId(quesId);
  validateMongodbId(id);
  validateMongodbId(commentId);
  try {
    const deleteComment = await Qnacomment.findByIdAndDelete(commentId);
    const findQuestion = await Question.findByIdAndUpdate(
      quesId,
      {
        $pull: { comments: commentId },
      },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Comment Deleted!" });
  } catch (error) {
    throw new error();
  }
});

module.exports = {
  createPost,
  getAQuestion,
  getAllQuestion,
  deleteQuestion,
  updateQuestion,
  updateAnswer,
  createAnswer,
  addComment,
  deleteComment,
};
