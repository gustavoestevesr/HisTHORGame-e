const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const BadgeSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    quiz: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },    
});

const Badge = mongoose.model('Badge', BadgeSchema);

module.exports = Badge;