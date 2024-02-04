const mongoose = require("mongoose");
const ListSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String },
    description: { type: String},
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}],
    userId: {type:String},
  },
  { timestamps: true }
);
module.exports = mongoose.model("List",ListSchema);