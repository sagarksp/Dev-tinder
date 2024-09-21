const userAuth =   (req, res,next) => {
    console.log("user data");
    const token = "xyz";
    const isAdminauthorized = token === "xyz"
    if (!isAdminauthorized) {
        res.status(401).send("unauthorized user")
    } 
    else {
      next();
    }
  }

  const adminAuth = (req,res,next)=>{
    console.log("auth get checking")
    const token = "xyz";
    const isAdminauthorized = token === "xyz"
    if(!isAdminauthorized){
        res.status(401).send("unauth admin")
    }
    else{
        next()
    }
  }


  module.exports = {userAuth,adminAuth}