const jwt=require("jsonwebtoken");
const User=require("../models/user");

const adminAuth= async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            return res.status(401).send("Authentication token not found.");
        }

    const decodedObj=await jwt.verify(token,"DEVTINDER@123"); //before we can pass id while creating token now we can access id from token

    const {_id}=decodedObj;

    const user=await User.findById(_id);
    if(!user){
        return res.status(404).send("User not found.");
    }
    req.user=user;
    
    next();
    }catch(err){
       return res.status(400).send("Error While fetching data"+err);
    }
}

module.exports={adminAuth};