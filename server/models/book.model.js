const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: false},
    isbn: {type: Number, required: false},
    description: {type: String, required: false},
    rating: {type: Number, required: true, default: 0},
    publisher: {type: String, required: false, default: "2005"},
    publishingYear: {type: Number, required: false},
    genre: {type: mongoose.Types.ObjectId, ref:"Genres", required: true, default: "62fca44e433704ca82de2e7a"},
    numPage: {type: Number, required: false},
    coverLocation: {type: String, required: false},
    pdfLocation: {type: String, required: false},
},{
    timestamp: true,
});

const Book = mongoose.model("books", bookSchema);

module.exports = Book;