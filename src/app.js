const express = require("express");
const app = express();




const connectDB = require("./config/database")
const User = require("./models/users");
const cookieParser = require("cookie-parser");

const cors = require("cors")

const userAuth = require("./miidleware/userauth")
// app.use(cors(),({origin:"http://localhost:5174",Credential:true}))
app.use(cors({origin:"http://localhost:5174", credentials:true}))
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

//first check connnection with database and than listen on port 7777
connectDB().then(()=>{
  console.log("database connected sucessfully")
  app.listen(7777,()=>{
    console.log("server host sucessfully")
  })
}).catch((err)=>{
  console.error("server not connected please review your code" + err.message)
})







 






























//now getting data from the database

// app.get("/user",async (req,res)=>{
//   const useremail = req.body.emailid;
//   console.log(useremail)

//   try{
//     const users = await User.findOne({emailid : useremail});
//     if(users.length === 0 ){
//      res.status(404).send("user not found")
//     }else{
//       res.send(users); 
//     } 
//   }catch(err){
//     res.status(400).send("something wrong when adding data to database")  
//   }
// })

// //api to get all the data
// app.get("/feed",async (req,res)=>{

//   const users = await User.find({});

//   try{
//     res.send(users)
//   }catch(err){
//     res.send("error")
//   }

// })

// //update by id
// app.patch("/user/:userid",async (req,res)=>{
//   // const userid = req.body.userid;

//   // const userid = req.body.userid;
//   const userid = req.params?.userid
//   const data = req.body
  

//   try{

//     //api level validation
//     const ALLOWED_UPDATES = ["age", "skills", "userName"];
//     //data ka jo object h uski har ek key  ko iterate krege allowed_update k data se agar wo key include h allowed data ki key se tabhi updyae krna h
//     const isUpdateAllowed = Object.keys(data).every((key)=>
//       ALLOWED_UPDATES.includes(key)
//     )
//     if(!isUpdateAllowed){
//       throw new Error("update not allowed")
//     }

//     //skills validation
//     if(data?.skills.length > 10){
//       throw new Error("maximum 10 skills is updated only")
//     }



//     const users = await User.findByIdAndUpdate({_id:userid},data);
//     res.send("user updated sucessfully");
//   }catch(err){
//     console.error("not updated user"+err.message)
//     res.send("something seems wrong")
//   }
// })

// //delete the user by using id




