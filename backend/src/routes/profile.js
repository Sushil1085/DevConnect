const express = require("express");
const { adminAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");
const profileRouter = express.Router();

//This API for View Who is logged in(which user is this profile) 

profileRouter.get("/profile/view", adminAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).send("User Not Found");
        }
        return res.json({
            message: "Profile Fetched Successfully",
            data: user
        });

    } catch (err) {
       return  res.status(400).send("Error " + err.message);
    }
})

//THis API for Edit Profile of whos logged in

profileRouter.patch("/profile/edit", adminAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Envalid edit request fields");
        }
        const loggedInUser = req.user; //Ethe Apn UserData ghetla req.user kdun mhnje te apn admiAuth save kela hota ani pudhe compaire kela req.body sang

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();
        // res.send(loggedInUser);
        res.json({
            message: `${loggedInUser.firstName} Your profile updated successfully`,
            data: loggedInUser
        }
        );


    } catch (err) {
        res.status(400).send("Error " + err.message);
    }
})

profileRouter.delete("/profile/delete", adminAuth, async (req, res) => {
    try{
        const loggedInUser=req.user;
        const data=await User.findByIdAndDelete(loggedInUser._id);
        res.json({
            message:`${loggedInUser.firstName} Your profile deleted successfully`,
            data
        })
    }catch(err){
        res.status(400).send("Error " + err.message);
    }
})
module.exports = profileRouter;