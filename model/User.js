const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 5
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8
    }
},
{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;