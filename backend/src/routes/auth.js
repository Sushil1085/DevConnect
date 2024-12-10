const express=require("express");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {validationSignup}=require("../utils/validation");
const {adminAuth}=require("../middlewares/auth");
var nodemailer = require('nodemailer');

const authRouter=express.Router();

//This API for creating new User
authRouter.post("/signup", async (req, res) => {    //apn User ha Model gheun "/signup" hy route vr tyache operations kraloy

    try { 
    validationSignup(req);

    const {password,firstName,lastName,emailId,age,gender,photoURL,skills,about}=req.body;

    const passHash=await bcrypt.hash(password,10);
    // console.log(passHash);
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passHash,
        age,
        gender,
        photoURL,
        skills, 
        about
    });
        await user.save();
        
        res.json({
            message:`${firstName} Created Successfully`,
            data:user
        })
        
    } catch (err) {
        // Handle general errors during the process
        res.status(400).send("Error while saving data: " + err.message);
    }
});

// authRouter.put("/editProfile",adminAuth ,async(req,res)=>{
//     try{
//         const id=req.user._id;
//         const updatedData=req.body;

//         const user=await User.findByIdAndUpdate(id,updatedData);

//         await user.save();
//         return res.status(200).json({
//             message: "Profile Updated Successfully",
//             data: user,
//           });
//     }catch(err){
//         res.status(400).send("Error While fetching data"+err);
//     }
// })

//this API forn login a user
authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;

        const user=await User.findOne({emailId});
        if(!user){
            return res.status(404).send("User Not Found");
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password); //first password is what we put on frontend or body in postman second is from DB it compare both and give us result
        
        if(isPasswordMatch){

            //create jwt token
            const token=await jwt.sign({_id:user._id},"DEVTINDER@123",{ // here we can create token here and pass user id nad one secret key
                expiresIn:"1d"
            }); //hide the user id inside token and second one is secrete key third is for expires in 1 day 


            res.cookie("token", token);

            res.send(user);
        }
        else{
           return res.send("Incorrect Password");
        }
        // console.log(user);
        
    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
});

//This API for logout

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("Logout Successfully");
})

authRouter.post("/forgot-password",async(req,res)=>{
    try{
        const {emailId}=req.body;

        const user=await User.findOne({emailId});
        if(!user){
            return res.status(404).send("User Not Found");
        }

        const token=jwt.sign({_id:user._id},"DEVTINDER@123",{expiresIn:"1h"});

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'sushilp1085@gmail.com',
              pass: 'ooxn tnrr qhcd rvcd'
            }
          });
          
          var mailOptions = {
            from: 'sushilp1085@gmail.com',
            to: emailId,
            subject: 'Reset Your Password',
            text: `http://localhost:5173/reset-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error("Error sending email: ", error);
                return res.status(500).send("Failed to send email.");
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).send("Email Sent Successfully");
            }
          });

    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
});

authRouter.post("/reset-password/:id/:token",async(req,res)=>{
    try{
        const {id,token}=req.params;
        const {password}=req.body;

        if(!id || !token){
            return res.status(404).send("User ID or Token Not Found");
        }
        const decodedObj=jwt.verify(token,"DEVTINDER@123");
        if(!decodedObj){
            return res.status(400).send("Invalid Token");
        }
        const passHash=await bcrypt.hash(password,10);

        User.findByIdAndUpdate(id,{password:passHash}).then((user)=>{
            if(!user){
                return res.status(404).send("User Not Found");
            }
            return res.status(200).send("Password Reset Successfully");
        }).catch((err)=>{
            return res.status(400).send("Error While fetching data"+err);
        })

    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
});



authRouter.get("/getAllUsers",async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
})
module.exports=authRouter;