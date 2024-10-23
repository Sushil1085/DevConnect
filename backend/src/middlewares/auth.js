const adminAuth=((req,res,next)=>{
    token="xyzq";
    isAuthorisedToken=token==="xyz";
    console.log("hello from middleware");
    
    if(isAuthorisedToken){
        next();
    }else{
        res.send("Not Authorised");
    }
})

module.exports={adminAuth};