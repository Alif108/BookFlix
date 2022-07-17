const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        date_of_birth: {type: Date, required: true},
        gender: {type: String, required: true},
        region: {type: String, required: true},
        current_points: {type: Number, default: 0},
        total_points: {type: Number, default: 0},
        badge_id: {type: Number, default: null},
        number_of_books_read: {type: Number, default: 0},
        number_of_total_review: {type: Number, default: 0},
        role: {type: String, default:"Basic", required: true},
    },
    { collection: 'user' }
)

const model = mongoose.model('User', User)

module.exports = model