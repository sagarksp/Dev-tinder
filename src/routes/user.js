const express = require('express');
const userRouter  = express.Router();

const userAuth = require("../miidleware/userauth")
const ConnectionRequest = require("../models/connectionRequest")

const User  = require("../models/users")

const USER_INFO = ["firstName", "lastName", "aboutMe", "skills", "age", "gender", "photoUrl"]

userRouter.get("/user/requests/recieved" ,userAuth, async (req,res)=>{

    

try{
    const loggedInUser  = req.user;
    const connectionRequest = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate("fromUserId", USER_INFO)
    //from user ka lastname or firstname k liye hum REF(schema me) and POPULATE 
    res.json({message:`all the interested connection request you recieved is  = `, data:connectionRequest})

}catch(err){
    res.status(400).json({message:"Something wrong in the user Router MESSAGE: = " + err.message})

}
})

//all the connection 

userRouter.get("/user/connections" , userAuth , async (req, res)=>{
    try{
        const loggedInUser  = req.user;
        const connectionRequest  = await ConnectionRequest.find({
            //The query returns all such "accepted" connection requests involving the logged-in user.
            $or: [
                {fromUserId:loggedInUser._id, status:"accepted"},
                {toUserId:loggedInUser._id, status:"accepted"}
                 ]
        }).populate("fromUserId", USER_INFO).populate("toUserId", USER_INFO)

        //mapping to only seeing the from user data 
        data = connectionRequest.map((rows) => {
            // here i am used toString because mongo id object h par hume usek andar ki string compare krni h to 
            if(rows.fromUserId._id.toString() === loggedInUser._id.toString()){
                return rows.toUserId;
            }
            return rows.fromUserId})

        res.json({message: loggedInUser.firstName + " All the connection you have" , data})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

//feed api 
userRouter.get("/feed", userAuth, async (req, res)=>{

     try{   
        //It retrieves the logged-in user's information.
        const loggedInUser = req.user;

        const connectionRequests  = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
                ]
        }).select("fromUserId toUserId")

        //This line creates a new Set called hideUsersFromFeed. A Set is like an array but ensures all values are unique (i.e., no duplicates).
        const hideUsersFromFeed =new Set()
        connectionRequests.forEach((req) => {
           // his adds the fromUserId (the user who sent the connection request) to the hideUsersFromFeed set. 
            hideUsersFromFeed.add(req.fromUserId.toString()),

           // Similarly, this adds the toUserId (the user who received the connection request) to the hideUsersFromFeed set.
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        

        const users = await User.find({
            $and:[
                {_id: {$nin: Array.from(hideUsersFromFeed)}},
                {_id: {$ne:loggedInUser._id}}

            ]
           
        }).select(USER_INFO)
        
         
       res.send(users)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports = userRouter;