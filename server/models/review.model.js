const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    bookID: {type: mongoose.Types.ObjectId, ref:"Book", required: true},
    userID: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    rating: {type: Number, required: true, default: 0},
    description: {type: String, required: true},
    timestamp: {type: Date, required: true},
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;