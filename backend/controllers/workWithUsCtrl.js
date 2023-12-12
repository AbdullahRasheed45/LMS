const { validateMongodbId } = require("../config/validateMongoDbId");
const Work = require("../models/workWithUsModel");
const asyncHandler = require("express-async-handler");
const {
  createOne,
  updateOne,
  getOne,
  deleteOne,
  getAll,
} = require("./customCtrl");

const createWork = createOne(Work);

const getAllWork = getAll(Work);

const getAWork = getOne(Work);

const updateAWork = updateOne(Work);

const deleteAWork = deleteOne(Work);

module.exports = { createWork, getAllWork, getAWork, updateAWork, deleteAWork };
