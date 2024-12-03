const express=require("express");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {validationSignup}=require("../utils/validation");
const {adminAuth}=require("../middlewares/auth");

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
            // console.log(token);
            // console.log(JSON.stringify(req.cookies) + " cookies");
            
            // res.cookie("token",token,{
            //     expires:new Date(Date.now() + 8*3600000),
            // });

            res.cookie("token", token, {
                httpOnly: true, // Ensures the cookie isn't accessible via client-side JavaScript
                secure: process.env.NODE_ENV === "DEVTINDER@123", // Use secure cookies in production
                sameSite: "strict", // Protects against CSRF attacks
                expires: new Date(Date.now() + 8 * 3600000), // 8 hours expiration
              });

            return res.json(user);
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

authRouter.get("/getAllUsers",async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
})
module.exports=authRouter;