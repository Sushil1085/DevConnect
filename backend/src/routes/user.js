const express = require("express");
const userRouter=express.Router();
const {adminAuth}=require("../middlewares/auth");
const Connectionrequests=require("../models/connectionRequest");
const e = require("express");

userRouter.get("/user/requests/received",adminAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest= await Connectionrequests.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"]);
        res.json({
            msg:"Connection Requests",
            data:connectionRequest
        })     
    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }

});

userRouter.get("/user/connections",adminAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user._id;
        const connectionRequest=await Connectionrequests.find({
            $or:[{fromUserId:loggedInUser,status:"accepted"},
                {toUserId:loggedInUser,status:"accepted"}] //we here give condition like my login id===that id who has same id with it and status is accepted in database
        }).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"]);

        // console.log(connectionRequest);
        

        const data=connectionRequest.map((request)=>{
            if(request.fromUserId.toString()===loggedInUser.toString()){
                return request.toUserId
            }
            else{return request.fromUserId}
        })
        res.json({
            msg:"Connection Requests",
            data
        })
    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
});

module.exports=userRouter;