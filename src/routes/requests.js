const express = require("express");
const userAuth = require("../miidleware/userauth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/users");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      //userauth se user id mil jayegi current user ki
      const fromUserId = req.user._id;

      const toUserId = req.params.toUserId; //to user id dynamically a jayegi

      const status = req.params.status; //status bhi we can change dynamically we get

      //cehceking with databse that fromuserid is not same as the touserid

      if (fromUserId == toUserId) {
        return res
          .status(404)
          .json({ message: "why you try to send a request to yourself" });
      }

      const allowedStatus = ["interested", "rejected"]; //status m in dono m se hina chaiye validation check for status
      if (!allowedStatus.includes(status)) {
        return res.json({ message: "Status is not valid" }); //always use return because we didnot want to go further without bypassing this validation
      }

      //check wheather the user is inside the database or not
      const toUser = await User.findById(toUserId); //database m to userid se find krne k liye
      if (!toUser) {
        //user nhi mila to
        return res
          .status(404)
          .json({ message: "User not found in the database" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId }, //shorthand property of{fromuserId: fromUserId} //cehcking with existing user with existing user

          { fromUserId: toUserId, toUserId: fromUserId }, //This condition checks if there is a connection request from the other user to the current user
        ],
      });
      if (existingConnectionRequest) {
        //here if we use existing connection request with not than schema handle error by own but with exceptions
        //so always use validation
        return res
          .status(400)
          .json({ message: "Connection Request already exists!!" });
      }

      //creating instance of the model
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save(); //saving the data in the database

      res.json({
        message: "Connection request sent sucessfully",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR" + err.message);
    }
  }
);

//creating api for review the status
requestRouter.post("/request/review/:status/:requestId",userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user; //this came from the userAuth
    

      const { status, requestId } = req.params; // Extract reqId and status

      const allowedStatus = ["accepted", "rejected"]; 
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }
      
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId, //This part is checking if the _id field of the connection request in the database matches the reqId.
        toUserId: loggedInUser._id, //This part checks if the toUserId field in the connection request matches the logged-in user
        status: "interested", //This part checks if the status of the connection request is set to "accepted".
        
      });
    

    
      // If no valid connection request is found, send an error response.
      if (!connectionRequest) {
        return res.status(404).json({ message: "Connection request not found" });
      }

      // Update the status of the connection request to the new status.
      connectionRequest.status = status;

      // Save the updated connection request to the database.
      const data = await connectionRequest.save();

      // Send a confirmation message with the updated status.
      res.json({ message: "Connection request " + status , data});
    } catch (err) {
      res.status(400).send("ERROR: " + err.messaage);
    }
  }
);
// requestRouter.post(
//   "/request/review/:status/:requestId",
//   userAuth,
//   async (req, res) => {
//     try {
//       const loggedInUser = req.user;
//       const { status, requestId } = req.params;

//       const allowedStatus = ["accepted", "rejected"];
//       if (!allowedStatus.includes(status)) {
//         return res.status(400).json({ messaage: "Status not allowed!" });
//       }

//       const connectionRequest = await ConnectionRequest.findOne({
//         _id: requestId,
//         toUserId: loggedInUser._id,
//         status: "interested",
//       });
//       if (!connectionRequest) {
//         return res
//           .status(404)
//           .json({ message: "Connection request not found" });
//       }

//       connectionRequest.status = status;

//       const data = await connectionRequest.save();

//       res.json({ message: "Connection request " + status, data });
//     } catch (err) {
//       res.status(400).send("ERROR: " + err.message);
//     }
//   }
// );

module.exports = requestRouter;
