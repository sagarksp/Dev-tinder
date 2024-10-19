const { type } = require("express/lib/response");
const mongoose  = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"User"//here we make the connection with the User Scehma table
  },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"User"
  },
  status:{
    type:String,
    require:true,
    enum:{
      values:["ignored","interested","rejected","accepted"],//in value m si hi hona chaiye status
      message:`{VALUE} is incorrect status type`,//jab koi values ki value se status different dalnega than it shows error
    }
  },
   
},{timestamps:true})


module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema)//first name is the name of the model 