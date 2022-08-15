const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myListSchema = new Schema({
    bookID: {type: mongoose.Types.ObjectId, ref:"Book", required: true},
    userID: {type: mongoose.Types.ObjectId, ref: "User", required: true},
},
    { collection: 'myList' }        // collection name in the database
);

const MyList = mongoose.model("myList", myListSchema);

module.exports = MyList;