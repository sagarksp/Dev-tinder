const express = require('express');

const authRouter = express.Router();

const bcrypt = require("bcrypt");
const {validateSignupData} = require("../utils/validation");
const jwt = require("jsonwebtoken");
const User = require("../models/users");



authRouter.post("/signup",async (req,res)=>{

    // const user = new User({
    //   firstName:"shri",
    //   lastName:"radharani",
    //   // emailid:"shrikrishna@shriradha.com"
    // })
    
    
    try{
      // req data gya yaha se validate sign updata m
      validateSignupData(req);
      const {password, firstName, lastName, emailid,userName,skills,photoUrl,age,gender} = req.body;
      
      const passwordHash = await bcrypt.hash(password,10);
      console.log(passwordHash)
  
  
      // const user = User(req.body)
      const user = User({firstName, lastName, emailid, userName, password:passwordHash, skills, photoUrl,age,gender})
  
  
      const savedUser = await user.save();
      const token = await savedUser.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now()+ 8*3600000)
      })
      
      res.json({message: "User added sucessfully !" , data:savedUser})
    }catch(err){
      console.log("something went wrong"+ err.message)
      res.status(404).send("something went wrong");
    }
  });
  
  
  //creating login api
  authRouter.post("/login", async (req,res)=>{
  
  
    try{
      const {emailid, password} = req.body;
    
      const user = await User.findOne({emailid: emailid});//finding one from user
      
      if(!user){
        throw new Error("invalid email id");
      }
  
        // const hashpassword = user.password;//hash pasword getting
      //  const isPasswordvalid = await bcrypt.compare(password, hashpassword);
      const isPasswordvalid  = await user.validPassword(password);
  
       if(isPasswordvalid){
  
        //by using res.cokkie we can pass cokkie inside our code
        // res.cookie("token","osdnvslknvlksdv;gksdpokpgjsdjgnjsdngdjspgjjgjnsdklnglsndgl")
  
        // const token = await jwt.sign({_id:user._id},"DEV@tinder",{expiresIn:"1d"});
        //phle jo hide krna h use likhege jaise yha mujhe userid hide krni h fir baad m koi secret key
        // console.log(token)
  
  
        //getting token from userschema we overload get the token task to userschema methods 
        const token = await user.getJWT();
  
        res.cookie("token" , token, {
          expires: new Date(Date.now() + 8 * 3600000)}) //expiring cookies in 8 hours
        res.send(user);
      
       } 
       else{
        throw new Error("invalid password");
       }
    }catch(err){
      res.status(404).send("something wrong while login " + err.message)
      console.log(err.message)
    }
  }) 

  authRouter.post("/logout", async (req,res)=>{
    // res.cookie("token" , null, {
    //   expires: new Date(Date.now())}) //expiring cookies right there and the user will be logout  
   
    // res.send("User logout sucessfully ");
    //or

    res.cookie("token",null, {
      expires: new Date(Date.now())
    }).send("user logout sucessfully ")

  })

module.exports = authRouter; 