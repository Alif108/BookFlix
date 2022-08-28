const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userID: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    packageID: {type: mongoose.Types.ObjectId, ref: "Packages", required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
    // subscriber_name: {type: String, required: true},
    // contact_number: {type: String, required: true},
    // bkash_number: {type: String, required: true},
    // address: {type: String, required: true},
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;