const mongoose = require('mongoose');

const appoint = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    dr: {
        type: Array,
        require: true
    },
    countdr: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('appoint', appoint);