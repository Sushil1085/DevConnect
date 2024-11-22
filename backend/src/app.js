const express=require("express");
const {connectDB}=require("./config/database");
const User=require("./models/user");
const {validationSignup}=require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const cors=require("cors");
const {adminAuth}=require("./middlewares/auth");
const app=express();

app.use(express.json());   
app.use(cookieParser()); 
app.use(cors());



app.post("/signup", async (req, res) => {    //apn User ha Model gheun "/signup" hy route vr tyache operations kraloy

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

app.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;

        const user=await User.findOne({emailId});
        if(!user){
            res.status(404).send("User Not Found");
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password); //first password is what we put on frontend or body in postman second is from DB it compare both and give us result
        
        if(isPasswordMatch){

            //create jwt token
            const token=await jwt.sign({_id:user._id},"DEVTINDER@123",{
                expiresIn:"1d"
            }); //hide the user id inside token and second one is secrete key third is for expires in 1 day 
            console.log(token);
            console.log(JSON.stringify(req.cookies) + " cookies");
            
            res.cookie("token",token);
            res.send("Login Successfully");
        }
        else{
           return res.send("Incorrect Password");
        }
        // console.log(user);
        
    }catch(err){
        res.status(400).send("Error While fetching data"+err);
    }
})

app.get("/profile",adminAuth, async (req,res)=>{
    try{
        const user=req.user;
        if(!user){
            res.status(404).send("User Not Found");
        }
        res.send(user);
            
    }catch(err){
        res.status(400).send("Error "+err.message);
    }
})

app.post("/sentConnectionRequest",adminAuth,async(req,res)=>{

    const user=req.user;
    
    console.log("Connection Request Sent from "+user.firstName);
    
    res.send("Connection Request Sent from "+user.firstName);
})


app.get("/user", async (req,res)=>{
  
    try{
        const user=await User.find(); //eth apn tya body madhe emailId takun tyacha serve(all) data gheu shakto
        if(user.length==0){
            res.status(404).send("User Not Found");
        } 
        res.send(user);
    }catch(err){    
        res.status(400).send("Error While fetching data"+err);
    }
})

connectDB().then(()=>{
    app.listen(7000,()=>{
        console.log("server is running on port 7000");
    });
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
})

