const mongoose = require("mongoose");
const historySchema = mongoose.Schema({
  name: {
    type: String,
    default: "History",
  },
  movies: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
      playbackProgress: Number,
    },
  ],
  userId: mongoose.Schema.Types.ObjectId,
});
module.exports = mongoose.model("History", historySchema);
