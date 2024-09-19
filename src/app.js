//importing the express library
const express = require("express");

//Now creating a application of express.js
const app = express();

//Handling requests 
//this is use for default / path sare path p yhi rhega kyoki default h ye isme koi path nahi diya humne 

// app.use((req,res)=>{
//     res.send("Hello from the default server ")
// })


// app.use("/",(req,res)=>{
//     res.send("Hello from the dashboard")
// });

app.use("/hello",(req,res)=>{
    res.send("Hello from the hello path")
});

app.use("/test",(req,res)=>{
    res.send("Hello from the test server")
})

//we can pass diffeerent path before (just before callback we have to write path)


//when we have to create server than i have to listen 
//it shows that app is listening all request at port 3000
app.listen(7777,()=>{

    //this console is only executed when the server is running sucessfully
    console.log("Server is sucessfully listening on PORT 3000");

});