const { name } = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/asscociationDB")

const userSchema = new mongoose.Schema({ 
    name :  String ,
    email : String,
    age : Number ,
    posts :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ]
})


module.exports = mongoose.model("User" , userSchema)