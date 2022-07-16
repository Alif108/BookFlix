const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    isbn: {type: Number, required: false},
    description: {type: String, required: true},
    rating: {type: Number, required: true, default: 0},
    publisher: {type: String, required: true},
    publishingYear: {type: Number, required: true},
    genre: {type: String, required: true},
    numPage: {type: Number, required: true},
    coverLocation: {type: String, required: false},
    pdfLocation: {type: String, required: true},
},{
    timestamp: true,
});

const Book = mongoose.model("books", bookSchema);

module.exports = Book;