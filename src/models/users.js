const mongoose = require("mongoose");
 const validator = require("validator")

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
        unique:true,
        //lets validate our email
        //value m email aayi jo enter ki fir validator n check ki ki jo value h wo validator email se match nhi kr rhi to to 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not valid enter valid email"+ value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        //validate the password checek if it is strong password or not
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password in not as per norms please write strong password" + value)
            }
        }

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