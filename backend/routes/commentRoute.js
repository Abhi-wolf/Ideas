const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { addComment, getComments } = require("../controllers/commentController");

const router = express.Router();

router.post("/comment", isAuthenticated, addComment);
router.get("/:id/comments", isAuthenticated, getComments);

module.exports = router;
