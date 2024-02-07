const mongoose = require('mongoose');
const validator = require('validator');

const connectSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email"
        }
    },
    phNumber: {
        type: Number,
        required: true,
        minlength: 10,
        unique: true // Ensure uniqueness
    },
    Message: {
        type: String,
        required: true
    }
});

const ConnectModel = mongoose.model("Connect", connectSchema);
module.exports = ConnectModel;