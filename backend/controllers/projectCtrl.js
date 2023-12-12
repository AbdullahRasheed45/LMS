const Project = require("../models/projectModel");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./customCtrl");

const postProject = createOne(Project);
const getProject = getOne(Project);
const getAllProject = getAll(Project);
const updateProject = updateOne(Project);
const deleteProject = deleteOne(Project);

module.exports = {postProject, getAllProject, getProject, deleteProject, updateProject};
