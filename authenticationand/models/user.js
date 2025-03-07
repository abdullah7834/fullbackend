const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/authTestApp")


const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports  = mongoose.model("User" , userSchema)
