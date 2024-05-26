const Comment = require("../models/commentModel");
const Idea = require("../models/ideasModel");

const addComment = async (req, res) => {
  try {
    console.log(req.body);
    const { comment, id: ideaId } = req.body;
    const { id } = req.user;
    // const { id: ideaId } = req.params;

    if (!ideaId || !comment) {
      return res
        .status(500)
        .json({ success: false, message: "All fileds required" });
    }

    if (!id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const idea = await Idea.findOne({ _id: ideaId });

    if (!idea) {
      return res
        .status(404)
        .json({ success: false, message: "Idea not found" });
    }

    const newComment = await Comment.create({ comment, user: id, ideaId });

    if (!newComment) {
      return res
        .status(500)
        .json({ success: false, message: "Comment not added" });
    }

    idea.comments.push(newComment._id);
    await idea.save();
    await idea.populate({
      path: "comments",
      populate: { path: "user", select: "name" }, // Nested population for user name
    });


    const io = req.app.get("io");
    io.emit("newComment", { ideaId, comments: idea.comments });

    res.status(200).json({
      success: true,
      data: newComment,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Fail", message: error });
  }
};

// get all comments of an idea id
const getComments = async (req, res) => {
  try {
    const { id: ideaId } = req.params;
    const comments = await Comment.find({ ideaId });

    if (!comments) {
      return res
        .status(404)
        .json({ success: false, message: "Comments not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Comments", data: comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Fail", message: error });
  }
};

module.exports = { addComment, getComments };
