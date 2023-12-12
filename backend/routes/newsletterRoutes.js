const { subscribe, unsubscribe } = require("../controllers/newsletterCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");

const newsRoutes = require("express").Router();

//POST
newsRoutes.post("/", subscribe);

//Delete
newsRoutes.delete("/:id", unsubscribe);

module.exports = newsRoutes;
