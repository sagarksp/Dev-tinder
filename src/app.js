const express = require("express");
const app = express();
const {userAuth,adminAuth} = require("./miidleware/userauth")


app.use("/admin" , adminAuth)

app.use("/user",userAuth);
app.get("/user/getdata", (req, res) => {
  res.send("2nd auth user get data");
})

app.get("/admin/userdata",(req,res)=>{
  console.log("server comnn")
  res.send("admin userdata")
})



app.listen(7777, () => {
  console.log("server run sucessfully");
});
