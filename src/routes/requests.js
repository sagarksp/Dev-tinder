const express = require("express");
const requestsRouter = express.Router();


const userAuth = require("../miidleware/userauth")

requestsRouter.post("/connectionrequest",userAuth, (req,res)=>{

    const user  =req.user;
    console.log(user.firstName + " " + "sent a connnection request")
  
    res.send(user.firstName + " " +  "sent a connnection request")
  })

module.exports = requestsRouter;