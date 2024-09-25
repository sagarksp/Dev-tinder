const mongoose = require("mongoose");

const connectDB = async ()=>{
    mongoose.connect("mongodb+srv://kspsagar02:RIpstyxSs8khDRsu@database.ocbai.mongodb.net/")
}

module.exports = connectDB;