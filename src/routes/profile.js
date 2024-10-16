const express = require("express");

const profileRouter = express.Router();

const userAuth = require("../miidleware/userauth")

profileRouter.get("/profile", userAuth , async (req,res)=>{ 

    try{
      //  const {token} = req.cookies
    
    // verifying the token 
    //jo chijn hide ki h whi aayegi jsb decoded message console krege
      // const decodeMessage = await jwt.verify(token, "DEV@tinder") 
      // const {_id} = decodeMessage;//id nikal lege decode message using default method to get id
      
      
      // console.log("user user id is = " + _id)
    
      //finding user 
      // const user = await User.findById(_id)
      const user  = req.user;
      // console.log("Login user is = "+user.firstName+ user.lastName)
      res.send(user)
    }catch(err){
      res.status(400).send("something went wrong user not find login  agaain" + err.message)
      console.log("something went wrong" + err.message)
    }
    })

    module.exports = profileRouter;