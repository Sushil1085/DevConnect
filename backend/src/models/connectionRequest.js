const mongoose=require("mongoose");

const connectionRequestSchema=mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","accepted","rejected","interested"],
            message:`{VALUE} is not supported`
        }
    }
},
{
    timestamps:true
}
)

const ConnectionRequest=mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequest;