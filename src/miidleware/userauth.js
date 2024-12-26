const jwt = require("jsonwebtoken");
const User = require("../models/users");

const userAuth = async (req, res, next) => {

  // read the token from the req cookies

  // getting token
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!"); //ui m jab 401 status hoga to login page p bhej do
    }

    const decodedObject = await jwt.verify(token, "DEV@tinder");

    const { _id } = decodedObject;

    let user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user//jo bhi user h uska data

    next();//if user is there than call next
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = userAuth









































// // const userAuth =   (req, res,next) => {
// //     console.log("user data");
// //     const token = "xyz";
// //     const isAdminauthorized = token === "xyz"
// //     if (!isAdminauthorized) {
// //         res.status(401).send("unauthorized user")
// //     } 
// //     else {
// //       next();
// //     }
// //   }

// //   const adminAuth = (req,res,next)=>{
// //     console.log("auth get checking")
// //     const token = "xyz";
// //     const isAdminauthorized = token === "xyz"
// //     if(!isAdminauthorized){
// //         res.status(401).send("unauth admin")
// //     }
// //     else{
// //         next()
// //     }
// //   }


// //   module.exports = {userAuth,adminAuth}