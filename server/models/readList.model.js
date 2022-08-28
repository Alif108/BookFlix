const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const readListSchema = new Schema({
    bookID: {type: mongoose.Types.ObjectId, ref:"Book", required: true},
    userID: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: false},
    isFinished: {type: Boolean, required: true, default: false},
    currentPage: {type: Number, required: true, default: 1},
},
    { collection: 'ReadList' }        // collection name in the database
);

const ReadList = mongoose.model("readList", readListSchema);

module.exports = ReadList;