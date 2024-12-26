const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://kspsagar02:68Hzfb07jPOsthL9@database.ocbai.mongodb.net/")
}

module.exports = connectDB;
