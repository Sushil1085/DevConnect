const express=require("express");
const {connectDB}=require("./config/database");
const {User}=require("./models/user");

const app=express();

app.use(express.json());

app.post("/signup",async (req,res)=>{

    const user=new User(req.body);
    
    try{
        await user.save();
        res.status(201).send(user);
    }catch(err){    
        res.status(400).send("Error While saving data"+err);
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

