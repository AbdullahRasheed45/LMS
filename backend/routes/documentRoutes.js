const {
  deleteAdoc,
  updatedoc,
  getSingledoc,
  getAlldocs,
  postdoc,
} = require("../controllers/documentationCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const docRouter = require("express").Router();

docRouter.post("/", authMiddleware, restrictTo("admin"), postdoc);
docRouter.get("/", getAlldocs);
docRouter.get("/:slug", getSingledoc);
docRouter.put("/:id", authMiddleware, restrictTo("admin"), updatedoc);
docRouter.delete("/:id", deleteAdoc);

module.exports = docRouter;
