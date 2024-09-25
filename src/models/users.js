//creating schema

const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    firstName:{
        type:String,
    },
    secondName:{
        type:String
    },
    email:{
        type:String
    },
    age:{
        type:Number
    }
});

module.exports = mongoose.model("User",userschema)