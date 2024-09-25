const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String
    }
})

//exporting direectly 

module.exports = mongoose.model("User",userSchema)