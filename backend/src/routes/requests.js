const express=require("express");
const {adminAuth}=require("../middlewares/auth");
const requestRouter=express.Router();
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");


requestRouter.post("/request/send/:status/:toUserId",adminAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;  //jr he apn swap kel tr tyach id parameter la janr ani tithun apn te ghenar 
        const status=req.params.status;     //same as above

        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid Status "+status);
        }

        if(fromUserId.toString()===toUserId.toString()){
            return res.status(400).send("Cannot send request to yourself");
        }

        const toUser =await User.findById(toUserId);    //validattion for user is present or not in db
        if(!toUser){
            return res.status(404).send({msg:"User Not Found"});
        }

        const existingRequest=await ConnectionRequest.findOne({  //validation for request already sent or not
            $or:[{fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        });
        if(existingRequest){
            return res.status(400).send({msg:"Request Already Sent"});
        }

        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const data=await connectionRequest.save();
        
        res.json({
            message:req.user.firstName+" is "+status+" to "+toUser.firstName,
            data,
        })

    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
})


module.exports=requestRouter;