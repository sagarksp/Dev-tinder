const mongoose = require("mongoose");
 const validator = require("validator")
 const jwt  = require("jsonwebtoken")
 const bcrypt = require("bcrypt");





const userschema =new mongoose.Schema({
    firstName:{
        type:String,
        minLength:4,
        maxLength:40,
        
        
    },
    lastName:{
        type:String,
        
    },
    userName:{
        type:String,
        minLength:3,
        
       

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
        enum:{
            values:["male","female","others"],
            message:`{Value} is incorrect gender type`
        },
        // validate (value){
        //     if(!["male","female","others"].includes(value))
        //         throw new Error("Gender data is not valid")
        // }
    },
    aboutMe:{
        type:String,
        maxLength:500,
        default:"Hello i am developer love to connect with you"
    },
    photoUrl:{
        type:String,
        default:"https://s3.amazonaws.com/37assets/svn/https://media.gettyimages.com/id/485839850/vector/businessman-icon-on-a-white-background.jpg?s=1024x1024&w=gi&k=20&c=q1oT6ovYdZI-tJ3mgkbAPClld74wik5LnwSaKZYlkXA=-default-avatar.png"
    }
    
},
{
    timestamps:true
})

userschema.methods.getJWT  = async function (){//yha p arrow function kaamm nahi krega 

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

module.exports = mongoose.model('User', userschema);//first name is the name of the model by using firsts letter as a capital letter
