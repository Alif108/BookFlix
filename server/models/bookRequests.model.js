const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    userID: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    isbn: {type: Number, required: false},
    description: {type: String, required: true},
    publisher: {type: String, required: false},
    publishingYear: {type: Number, required: false},
    served: {type: Boolean, required: true, default: false},
},
    { collection: 'BookRequests' }        // collection name in the database
);

const BookRequests = mongoose.model("bookRequests", requestSchema);

module.exports = BookRequests;