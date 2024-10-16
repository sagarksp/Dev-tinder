const jwt = require('jsonwebtoken');
const User  = require("../models/users")

const userAuth = async (req,res,next)=>{

  //read the token from the req cookies

  // getting token
  try{
    
  const {token} = req.cookies;
  if(!token){
    throw new Error("Token is not valid")
  }
  
  //validation of tooken
  const decodeObject = await jwt.verify(token, "DEV@tinder");

  const {_id} = decodeObject;
  let user  = await User.findById(_id);

  if(!user){
    throw new Error("user not found");
  }
 req.user = user//jo bhi user ka 

  next();//if user is there than call next

}catch(err){
  res.status(400).send("user not found " + err.message)
}
 
  // alidate the tooken find the user token
}

module.exports = userAuth













































// const userAuth =   (req, res,next) => {
//     console.log("user data");
//     const token = "xyz";
//     const isAdminauthorized = token === "xyz"
//     if (!isAdminauthorized) {
//         res.status(401).send("unauthorized user")
//     } 
//     else {
//       next();
//     }
//   }

//   const adminAuth = (req,res,next)=>{
//     console.log("auth get checking")
//     const token = "xyz";
//     const isAdminauthorized = token === "xyz"
//     if(!isAdminauthorized){
//         res.status(401).send("unauth admin")
//     }
//     else{
//         next()
//     }
//   }


//   module.exports = {userAuth,adminAuth}