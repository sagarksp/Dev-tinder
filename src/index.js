const express = require("express");
const app = express();

const connectDB = require("./config/database")

const User = require("./models/users");
const cookieParser = require("cookie-parser");
const cors = require("cors")

// app.use(cors(),({origin:"http://localhost:5174",Credential:true}))
app.use(cors({origin:"*", credentials:true, methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],}))
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require('./routes/requests');
const userRouter = require("./routes/user")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)

//api for sending connection request 

app.delete("/user",async (req,res)=>{

  const userid = req.body.userid;
  try{
    const user = await User.findByIdAndDelete({_id:userid})
    res.send("user delete sucessfully")
  }catch(err){
    res.send("seeems wronng" + err.message)
  }
})

app.get("/",(req,res)=>{
  
 return res.json({message:"Server Running"})
})

//first check connnection with database and than listen on port 7777
connectDB().then(()=>{
  console.log("database connected sucessfully")
  app.listen(7777,()=>{
    console.log("server host sucessfully on port 7777")
  })
}).catch((err)=>{
  console.error("server not connected please review your code" + err.message)
})







 





























