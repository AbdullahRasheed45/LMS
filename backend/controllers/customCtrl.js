const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../config/validateMongoDbId");
const APIFeatures = require("../utils/apiFeatures");
const { default: slugify } = require("slugify");

const createOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      if (req.body.name) {
        req.body.slug = slugify(req.body.name.toLowerCase());
      }
      const data = await Model.create(req.body);
      res
        .status(200)
        .json({ status: true, message: "Model Field is Created", data });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  });
};

const getAll = (Model, populateOptions) => {
  return asyncHandler(async (req, res, next) => {
    try {
      let filter = {};
      const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      if (populateOptions) {
        query = features.query.populate(populateOptions);
      } else {
        query = features.query;
      }
      const data = await query;
      res.status(200).json({
        status: true,
        message: "All Model Are fetched Successfully!",
        data,
      });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  });
};

const getOne = (Model, populateOption) => {
  return asyncHandler(async (req, res) => {
    const { id, slug } = req.params;
    if (id) {
      validateMongodbId(id);
    }
    try {
      let query;
      if (id) {
        query = Model.findById(id);
      }
      if (slug) {
        query = Model.findOne({ slug: slug });
      }
      if (populateOption) {
        query = query.populate(populateOption);
      }
      const data = await query;
      if (!data) {
        throw new Error("No Data Found Wih this Id");
      }
      res.status(200).json({
        status: true,
        message: "Model is Fetched Successfully!",
        data,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
};

const updateOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      if (req.body.name) {
        req.body.slug = slugify(req.body.name.toLowerCase());
      }
      const work = await Model.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({
        status: true,
        message: "Model is Updated Successfully!",
        work,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
};

const deleteOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const work = await Model.findByIdAndDelete(id);
      res.status(200).json({
        status: true,
        message: "Model is Deleted Successfully!",
      });
    } catch (error) {
      throw new Error(error);
    }
  });
};
module.exports = { createOne, getAll, getOne, updateOne, deleteOne };
