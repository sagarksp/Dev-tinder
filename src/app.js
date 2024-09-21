const express = require("express");

const app = express();

app.use("/user" , [(req,res,next) =>{

  // is function ko route handlerbolte hai
  console.log("1 response");
  
  next();
  res.send("1st response");
}],
[(req,res,next)=>{
  console.log("2nd response")
 
  next()
  res.send("2nd response")
},
(req,res,next) =>{
  console.log("3rd response");
  // res.send("3rd response")
  next()
},
(req,res,next)=>{
  console.log("4th response");
  res.send("4th response")
  next()
}]
)




app.listen(7777, ()=>{
  console.log("server conncected succesfully")
})