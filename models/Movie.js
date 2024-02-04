const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    adult: {type: Boolean},
    backdrop_path: {type:String},
    genre_ids: {type: Array},
    original_language: {type: String},
    original_title:  {type: String},
    overview:  {type: String},
    popularity: {type: Number},
    poster_path:  {type: String},
    release_date:  {type: String},
    title:  {type: String},
    video: {type: String},
  },
  { timestamps: true }
);
module.exports = mongoose.model("Movie",movieSchema);