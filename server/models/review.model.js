const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookID: {type: String, required: true},
    userID: {type: String, required: true},
    rating: {type: Number, required: true, default: 0},
    description: {type: String, required: true},
    timestamp: {type: Date, required: true},
});

const Review = mongoose.model("reviews", bookSchema);

module.exports = Review;