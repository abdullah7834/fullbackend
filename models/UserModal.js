const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/AnyDB")







const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    imageurl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);