const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  newIdea,
  likeIdea,
  getAllIdeas,
  getIdea,
  getNewIdeas,
  bookMarkIdea,
} = require("../controllers/ideaController");

const router = express.Router();

router.post("/newIdea", newIdea);
router.put("/like", isAuthenticated, likeIdea);
router.put("/bookmark", isAuthenticated, bookMarkIdea);
router.get("/latestIdeas", getNewIdeas);
router.get("/", getAllIdeas);
router.get("/:id", getIdea);

module.exports = router;
