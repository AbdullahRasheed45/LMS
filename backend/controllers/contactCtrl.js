const { validateMongodbId } = require("../config/validateMongoDbId");
const Contact = require("../models/contactModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//CREATE contact

const createcontact = asyncHandler(async (req, res) => {
  try {
    const newcontact = await Contact.create(req.body);
    res.status(200).json({
      status: true,
      message: "Contact Form Submitted Successfully!",
      newcontact,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllcontact = asyncHandler(async (req, res) => {
  try {
    const allcontacts = await Contact.find();
    res.status(200).json({
      status: true,
      message: "Enquiry Fetched Successfully!",
      allcontacts,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAcontact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const contact = await Contact.findById(id);
    res.status(200).json({
      status: true,
      message: "Enquiry Fetched Successfully!",
      contact,
    });
  } catch (error) {
    throw new Error(error);
  }
});


const deleteAcontact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletecontact = await Contact.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Enquiry Deleted Successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatecontactStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateStatus = await Contact.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Enquiry Updated Successfully!",
      updateStatus,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createcontact,
  getAllcontact,
  getAcontact,
  deleteAcontact,
  updatecontactStatus,
};
