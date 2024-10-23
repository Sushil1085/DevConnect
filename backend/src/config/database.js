const mongoose=require("mongoose");


const connectDB =async()=>{
   await mongoose.connect(
    "mongodb+srv://sushilp1085:root@devtinderc.uki3a.mongodb.net/?retryWrites=true&w=majority&appName=devTinderC"
   );
}

module.exports={connectDB}