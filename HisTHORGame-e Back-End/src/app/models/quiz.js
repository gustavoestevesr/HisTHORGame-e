const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    synopsis: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    questions: [{
        title: {
            String
        },
        choices: [
            String
        ],
        answers: {
            String
        },
    }],
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;