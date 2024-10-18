const validator = require("validator")

const validateSignupData = (req)=>{

    // req ko ek ek karke check karege
    // req body se saara data aaega
    const {firstName, lastName, password, emailid} = req.body;

    if(!firstName || !lastName){
        throw new Error("name is not valid ")
    }
    else if(firstName.length < 4 && firstName.length >50){
        throw new Error("First name is not valid it must has character between 5 to 50")
    }
    else if(!validator.isEmail(emailid)){
        throw new Error("invalid email enter a valid email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong")
    }
}

const validateEditProfileData = (req) => {
    //only these fields can be editable
    const allowedEditFields = [
      "firstName",
      "lastName",
      "emailId",
      "photoUrl",
      "gender",
      "age",
      "about",
      "skills",
    ];
  
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field)
    );
  
    return isEditAllowed;
  };

module.exports = { validateSignupData, validateEditProfileData}