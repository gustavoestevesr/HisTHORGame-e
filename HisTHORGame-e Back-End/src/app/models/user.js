const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        uppercase: true,
    },
    university: {
        type: String,
        uppercase: true,
    },
    speedResponseAverage: {
        type: Number,
        default: 0,
    },
    correctResponseAverage: {
        type: Number,
        default: 0,
    },
    score: {
        type: Number,
        default: 0,
    },
    timePlayed: {
        type: Number,
        default: 0,
    },
    quizzesPlayed: {
        type: Number,
        default: 0,
    },
    solved: [{
        type: String,
    }],
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    badges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge',
    }],
    password: {
        type: String,
        require: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// encriptografar a senha
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;