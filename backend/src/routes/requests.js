const express=require("express");
const {adminAuth}=require("../middlewares/auth");
const requestRouter=express.Router();


requestRouter.post("/sentConnectionRequest",adminAuth,async(req,res)=>{

    const user=req.user;
    
    console.log("Connection Request Sent from "+user.firstName);
    
    res.send("Connection Request Sent from "+user.firstName);
})


module.exports=requestRouter;