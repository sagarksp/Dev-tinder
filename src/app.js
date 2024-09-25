const express = require("express");
const app = express();

const mongoose = require("mongoose");

const ConnectDB = require("./config/database");

const User = require("./models/users.js");


app.post("/signup", async(req,res)=>{
 

  //logic 
  const user = new User({
    firstName:"Sagar",
    lastName:"Kashyap",
    age:24,
    email:"kspsagar01@gmail.com"
  });

  try{
    await user.save();
    res.send("user added sucessfully");
  } catch( err) {
    res.status(400).send("Error"+ err.message)
  }
  
})

// database 
 ConnectDB().then(()=>{
  console.log("db connected sucessfully")
  app.listen(7777,()=>{
      console.log("connected to the server")
  
  })

}
 ).catch((err)=>{
      console.error("not coneected to database")
 
})

 

