const express = require("express");
const app = express();

const connectDB = require("./config/database");

const User = require("./models/users")

//middleware which convert our json data to js object
app.use(express.json())

app.post("/signup", async (req,res)=>{
  console.log(req.body)
  const user = new User(req.body);

  await user.save();
  res.send("data is updated sucessfully")



})

connectDB().then(()=>{
  console.log("database is connected sucessfully")
  app.listen(7777,()=>{
    console.log("server connected sucessfully go ahead with your thoughts")
  })
}).catch((err)=>{
  console.error("not connected to database sucessfully soomething went wrong" + err.message)
})