const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    photoLocation: {type: String, required: false},
},);

const Author = mongoose.model("author", authorSchema);

module.exports = Author;