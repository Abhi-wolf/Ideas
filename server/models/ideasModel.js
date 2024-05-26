const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: undefined,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ideaSchema.statics.findByIdAndIncrementViews = async function (id) {
  console.log("VIEWS");
  const idea = await this.findById(id);
  if (idea) {
    idea.views += 1;
    idea.save();
  }
  return idea;
};

module.exports = mongoose.model("Idea", ideaSchema);
