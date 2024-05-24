const express = require("express");
const {
  registerUser,
  loginUser,
  getBookMarks,
  logout,
  updateUser,
  getUser,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getbookmarks", isAuthenticated, getBookMarks);
router.post("/logout", isAuthenticated, logout);
router.get("/getuser/:id", isAuthenticated, getUser);
router.put("/update/:id", isAuthenticated, updateUser);

module.exports = router;
