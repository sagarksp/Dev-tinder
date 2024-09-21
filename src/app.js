//importing the express library
const express = require("express");

//Now creating a application of express.js
const app = express();

//Handling requests
//this is use for default / path sare path p yhi rhega kyoki default h ye isme koi path nahi diya humne

// app.use((req,res)=>{
//     res.send("Hello from the default server ")
// })


//code is executing line by line as js is a single threaded language 

app.get("/hello", (req, res) => {
  res.send("Hello from the hello path");
});

app.post("/test", (req, res) => {
  res.send("i am a post api ");
});

app.delete("/delete", (req, res) => {
  res.send("Hello from the delete");
});

app.get("/ab?c", (req,res) =>{
  res.send("ternary ab c ")
})

app.get("/db+c",(req,res)=>{
  res.send("we can add b as mush i can")
})

//reGEX with a api name m a  aana chaiye 
app.get(/a/,(req,res)=>{
  res.send("regex get api")
})

//last m fly aaana chaiye
app.get(/.*fly$/,(req,res)=>{
  res.send("fly wali api")
})

app.get("/users/:userId/:books/:bookId/:new",(req,res)=>{
    res.send(req.params)
})

app.get("/users?userid=101 & password = testing",(req,res)=>{
  // res.send(req.query);
  console.log(req.require)
})
//we can pass diffeerent path before (just before callback we have to write path)

//when we have to create server than i have to listen
//it shows that app is listening all request at port 3000

app.listen(7777, () => {
    
  //this console is only executed when the server is running sucessfully

  console.log("Server is sucessfully listening on PORT 7777");
});
