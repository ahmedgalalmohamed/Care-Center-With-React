const mongoose = require('mongoose');

const patient = mongoose.Schema({
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
        unqine:true,
        require: true
    },
    password:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('patient', patient);