const express = require("express");
const userRouter=express.Router();
const {adminAuth}=require("../middlewares/auth");
const Connectionrequests=require("../models/connectionRequest");
const User=require("../models/user");

//this is for showing the connection requests who has send to me
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

//this api for showing my accepted connections
userRouter.get("/user/connections",adminAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user._id;
        const connectionRequest=await Connectionrequests.find({
            $or:[{fromUserId:loggedInUser,status:"accepted"},
                {toUserId:loggedInUser,status:"accepted"}] //we here give condition like my login id===that id who has same id with it and status is accepted in database
        }).populate("fromUserId",["firstName","lastName","photoURL","about","skills","age","gender","emailId"]).populate("toUserId",["firstName","lastName","photoURL","about","skills","age","gender","emailId"]);

        // console.log(connectionRequest);
        

        const data=connectionRequest.map((request)=>{
            if(request.fromUserId._id.toString()===loggedInUser.toString()){
                return request.toUserId
            }
            else{
                return request.fromUserId
            }
        })
        res.json({
            msg:"Connection Requests",
            data
        })
    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
});

//Most Complicated API just rewise it and rewrite own
//this api for showing feed except my connections rejected ignored

userRouter.get("/feed",adminAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        limit=limit>50?50:limit;

        const skip=(page-1)*limit;

        const connectionRequest=await Connectionrequests.find({
            $or:[{fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}],}).select("fromUserId toUserId");

        const hideUserFromFeed =new Set(); //this set means we can store Array data but not repeted data only unique data
        
        connectionRequest.forEach((request)=>{
            hideUserFromFeed.add(request.fromUserId.toString());
            hideUserFromFeed.add(request.toUserId.toString());
        });

        const users=await User.find({
          $and:[
            {_id:{$nin:Array.from(hideUserFromFeed)}},
            { _id:{$ne:loggedInUser._id}},
        ]}).skip(skip).limit(limit);

        res.json({
            msg:"Connection Requests",
            data:users
        })

    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
});

module.exports=userRouter;