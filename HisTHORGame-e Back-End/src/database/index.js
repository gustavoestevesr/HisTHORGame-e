const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/histhorgame');
mongoose.Promise = global.Promise;

module.exports = mongoose;