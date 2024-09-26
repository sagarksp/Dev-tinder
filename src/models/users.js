const mongoose = require("mongoose");

const userschema =new mongoose.Schema({
    firstName:{
        type:String,
        minLength:5,
        maxLength:40,
        
    },
    lastName:{
        type:String,
    },
    userName:{
        type:String,
        minLength:5,
        required:true,
        unique:true

    },
    
    emailid:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate (value){
            if(!["male","female","others"].includes(value))
                throw new Error("Gender data is not valid")
        }
    },
    skills:{
        type:[String],
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("User", userschema);