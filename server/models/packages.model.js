const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema(
    {
        plan_name: {type: String, required: true},
        price: {type: Number, required: true},
        duration: {type: Number, required: true},               // in days
        max_books_limit: {type: Number, default: -1},
    },
    {
        timestamp: true,
    }
)

const Packages = mongoose.model('Packages', PackageSchema)

module.exports = Packages