const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    photoURL:{
        type:String,
        required:true
    },
    skills:[{
        type:String,
        required:true
    }],
    about:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);

const User=mongoose.model("user",userSchema);

module.exports = User;