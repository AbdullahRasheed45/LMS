const {
  createcontact,
  getAllcontact,
  getAcontact,
  updatecontactStatus,
  deleteAcontact,
} = require("../controllers/contactCtrl");
const { restrictTo, authMiddleware } = require("../middlewares/authMiddleware");

const contactRouter = require("express").Router();

contactRouter.post("/", createcontact);
contactRouter.get("/", getAllcontact);
contactRouter.get("/:id", authMiddleware, restrictTo("admin"), getAcontact);
contactRouter.put(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  updatecontactStatus
);
contactRouter.delete(
  "/:id",
  authMiddleware,
  restrictTo("admin"),
  deleteAcontact
);

module.exports = contactRouter;
