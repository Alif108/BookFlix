const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
   name: {type: String, required: true},
  },
);

const Genres = mongoose.model("Genres", genreSchema);

module.exports = Genres;