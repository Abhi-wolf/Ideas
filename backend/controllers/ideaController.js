const Idea = require("../models/ideasModel");
const User = require("../models/userModel");

const newIdea = async (req, res) => {
  try {
    const { description, username } = req.body;
    if (!description) {
      return res.status(500).json({ message: "Please add all the details" });
    }

    const idea = await Idea.create({
      description,
      username,
    });

    res.status(200).json({
      success: true,
      data: idea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

const likeIdea = async (req, res) => {
  try {
    const { id: ideaId } = req.body;
    const { id } = req.user;

    console.log("ideaid = ", ideaId);
    console.log("id = ", id);

    const idea = await Idea.findById({ _id: ideaId });

    if (!idea) {
      return res
        .status(404)
        .json({ success: false, message: "Idea not found" });
    }

    const likeIndex = idea.likes.findIndex((likeId) => likeId.equals(id));

    // if not liked then like
    if (likeIndex == -1) {
      idea.likes.push(id);
    } else {
      // if liked then remove like
      idea.likes.splice(likeIndex, 1);
    }

    await idea.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ likes: -1 });

    if (!ideas) {
      return res
        .status(200)
        .json({ status: "Successfull", message: "No Ideas found" });
    }

    res.status(200).json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

const getNewIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });

    if (!ideas) {
      return res
        .status(200)
        .json({ status: "Successfull", message: "No Ideas found" });
    }

    res.status(200).json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

const getIdea = async (req, res) => {
  try {
    const { id } = req.params;

    let idea = await Idea.findByIdAndIncrementViews(id);
    await idea.populate({
      path: "comments",
      populate: { path: "user", select: "name" }, // Nested population for user name
    });

    if (!idea) {
      return res
        .status(200)
        .json({ status: "Successfull", message: "Idea not found" });
    }

    res.status(200).json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

const bookMarkIdea = async (req, res) => {
  try {
    const { id: ideaId } = req.body;
    const { id } = req.user;

    const idea = await Idea.findById({ _id: ideaId });
    const user = await User.findById({ _id: id });

    if (!idea) {
      return res
        .status(404)
        .json({ success: false, message: "Idea not found" });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized access" });
    }

    const likeIndex = user.bookmarks.findIndex((likeId) =>
      likeId.equals(ideaId)
    );

    // if not liked then like
    if (likeIndex == -1) {
      user.bookmarks.push(ideaId);
    } else {
      // if liked then remove like
      user.bookmarks.splice(likeIndex, 1);
    }

    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = {
  newIdea,
  likeIdea,
  getAllIdeas,
  getIdea,
  getNewIdeas,
  bookMarkIdea,
};
