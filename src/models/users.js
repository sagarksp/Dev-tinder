const mongoose = require("mongoose");
 const validator = require("validator")
 const jwt  = require("jsonwebtoken")
 const cookieParser = require("cookie-parser");
 const bcrypt = require("bcrypt")




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
    skills:{
        type:[String],
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
    photoUrl:{
        type:String,
        default:""
    }
    
},
{
    timestamps:true
})

userschema.methods.getJWT  = async function (){

    const user = this;
    const token = await jwt.sign({_id:user._id}, "DEV@tinder", {expiresIn:"7d"})
    console.log(token)
    return token;

}

//creating password comparison here

userschema.methods.validPassword = async function(passwordInputByUser) {
    const user = this;
    const hashPassword = user.password;
  
    const isPasswordvalid = await bcrypt.compare(passwordInputByUser, hashPassword);
    
    return isPasswordvalid;
}

module.exports = mongoose.model('User', userschema);
