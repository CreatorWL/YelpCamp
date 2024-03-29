const mongoose = require("mongoose"),
      Comment  = require("./comment");

// Campground schema setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

campgroundSchema.pre("remove", async function() {
  await Comment.remove({
    _id: {
      $in: this.comments
    }
  });
});

module.exports = mongoose.model("Campground", campgroundSchema);