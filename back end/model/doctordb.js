const mongoose = require('mongoose');

const doctor = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    experience: {
        type: String,
        require: true
    },
    specialised: {
        type: String,
        require: true
    },
    degree: {
        type: String,
        require: true
    },
    hourwork: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    scr: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('doctor', doctor);
