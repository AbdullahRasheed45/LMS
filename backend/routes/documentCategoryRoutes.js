const {
    postDocumentCategory,
    getAllDocCategories,
    getADocCategory,
    updateADocCategory,
    deleteADocCategory,
  } = require("../controllers/documenCategoryCtrl");
  const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
  
  const docCatRouter = require("express").Router();
  
  docCatRouter.post("/", authMiddleware, restrictTo("admin"), postDocumentCategory);
  docCatRouter.get("/all", getAllDocCategories);
  docCatRouter.get("/:slug", authMiddleware, restrictTo("admin"), getADocCategory);
  docCatRouter.put("/:id", authMiddleware, restrictTo("admin"), updateADocCategory);
  docCatRouter.delete("/:id", authMiddleware, restrictTo("admin"), deleteADocCategory);
  
  module.exports = docCatRouter;
  