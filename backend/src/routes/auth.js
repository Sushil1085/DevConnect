const express=require("express");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {validationSignup}=require("../utils/validation");

const authRouter=express.Router();

authRouter.post("/signup", async (req, res) => {    //apn User ha Model gheun "/signup" hy route vr tyache operations kraloy

    try { 
    validationSignup(req);

    const {password,firstName,lastName,emailId}=req.body;

    const passHash=await bcrypt.hash(password,10);
    // console.log(passHash);
    

    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passHash
    });
        await user.save();
        
        res.status(201).send(user); // Respond with the newly created user object
    } catch (err) {
        // Handle general errors during the process
        res.status(400).send("Error while saving data: " + err.message);
    }
});

authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;

        const user=await User.findOne({emailId});
        if(!user){
            res.status(404).send("User Not Found");
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password); //first password is what we put on frontend or body in postman second is from DB it compare both and give us result
        
        if(isPasswordMatch){

            //create jwt token
            const token=await jwt.sign({_id:user._id},"DEVTINDER@123",{ // here we can create token here and pass user id nad one secret key
                expiresIn:"1d"
            }); //hide the user id inside token and second one is secrete key third is for expires in 1 day 
            console.log(token);
            console.log(JSON.stringify(req.cookies) + " cookies");
            
            res.cookie("token",token,{
                expires:new Date(Date.now() + 8*3600000),
            });
            res.send("Login Successfully");
        }
        else{
           return res.send("Incorrect Password");
        }
        // console.log(user);
        
    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
});


authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("Logout Successfully");
})
module.exports=authRouter;