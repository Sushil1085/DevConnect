const express=require("express");
const {connectDB}=require("./config/database");
const User=require("./models/user");
const {validationSignup}=require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const cors=require("cors");

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestsRouter=require("./routes/requests");

const app=express();

app.use(express.json());   
app.use(cookieParser()); 
app.use(cors());

app.use("/",authRouter); // The code come will here and check in this router if there then after res.send it will not go further,if not there goes in second router
app.use("/",profileRouter);
app.use("/",requestsRouter);

connectDB().then(()=>{
    app.listen(7000,()=>{
        console.log("server is running on port 7000");
    });
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
})

