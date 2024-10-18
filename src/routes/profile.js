const express = require("express");

const profileRouter = express.Router();

const userAuth = require("../miidleware/userauth")
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth , async (req,res)=>{ 

    // try{
      //  const {token} = req.cookies
    
    // verifying the token 
    //jo chijn hide ki h whi aayegi jsb decoded message console krege
      // const decodeMessage = await jwt.verify(token, "DEV@tinder") 
      // const {_id} = decodeMessage;//id nikal lege decode message using default method to get id
      
      
      // console.log("user user id is = " + _id)
    
      //finding user 
      // const user = await User.findById(_id)
      // const user  = req.user;
      // console.log("Login user is = "+user.firstName+ user.lastName)
      try{
      const user  = req.user;// this user come from the User
      res.send(user)
    }catch(err){
      res.status(400).send("something went wrong user not find login  agaain" + err.message)
      console.log("something went wrong" + err.message)
    }
    })
  
    //profile edit api
    profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
      try {
        if (!validateEditProfileData(req)) {//this validateeditprofile data comes from the validation 
          throw new Error("Invalid Edit Request");
        }
    
        const loggedInUser = req.user;
    
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        //This code takes the data sent by the user (in req.body), and updates the logged-in user's information with those new values. It allows the user to change their details, like updating their profile information
    
        await loggedInUser.save();//save data in the database
    
        res.json({
          message: `${loggedInUser.firstName}, your profile updated successfuly`,
          data: loggedInUser,
        });
      } catch (err) {
        res.status(400).send("ERROR : " + err.message);
      }
    })



    module.exports = profileRouter;