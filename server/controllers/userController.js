const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    //   400 for bad request
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const user = await User.findOne({ email });

    //   409 for conflict
    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "User already registered " });
    }

    const newuser = await User.create({ email, name, password });

    res.status(200).json({
      success: true,
      message: "Successfull",
      data: newuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // sendToken(user, 201, res);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { _id: id, name } = user;
    const data = { id, name };
    return res
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        message: "Successfull",
        data,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, status: "Fail", message: error });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(201).clearCookie("token").json({
      success: true,
      message: "Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, status: "Fail", message: error });
  }
};

const getBookMarks = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const bookmarks = user.bookmarks;

    res.status(200).json({ success: true, data: bookmarks });
  } catch (error) {}
};

const getUser = async (req, res) => {
  try {
    //first  find the user:
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    //validation of the user , if not then return error:
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    //send response:
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    // first  find the user:
    const { id } = req.user;
    const user = await User.findById(id);
    //validation of the user:
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    }

    const pass = req.body?.password;

    if (req.body?.name) {
      user.name = req.body.name;
    }

    if (req.body?.password) {
      user.password = req.body.password;
    }

    user.save();

    return res.status(200).json({
      message: "update successful",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "error in updating",
      success: false,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getBookMarks,
  logout,
  getUser,
  updateUser,
};
