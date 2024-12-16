import axios from "axios";
axios.defaults.withCredentials = true; //this is most imp because of that my cookie will be sent to backend

const login =async(data)=>{
// console.log(data,"from api file");

  try {
    const response = await axios.post("http://localhost:7000/login", data);
    return response;
  } catch (error) {
    console.error("Login API Error:");
    throw new Error("Failed to log in.");
  }
}

const viewProfileAPI =async()=>{
  try{

    const response =await axios.get("http://localhost:7000/profile/view");
    // console.log(response.data,"from api file");
    return response.data.data;
   
    
  }catch(err){
    console.error("Login API Error:");
    throw new Error("Failed to log in.");
  }
}

const logoutAPI =async()=>{
  try{
    const response =await axios.post("http://localhost:7000/logout");
    console.log(response,"from api file");
    return response;
   
    
  }catch(err){
    console.error("Login API Error:");
    throw new Error("Failed to log in.");
  }
}

const signup =async(data)=>{
  try {
    const response = await axios.post("http://localhost:7000/signup", data);
    return response;
  } catch (error) {
    console.error("Signup API Error:");
    throw new Error("Failed to sign up.");
  }
}

const forgotPasswordAPI =async(data)=>{
  try {
    const response = await axios.post("http://localhost:7000/forgot-password", data);
    return response;
  } catch (error) {
    console.error("Signup API Error:");
    throw new Error("Failed to sign up.");
  }
};

const resetPasswordAPI =async(data)=>{
  const { id, token, password } = data;
  try {
    console.log("data",id, token, password );
  const res= await axios.post(`http://localhost:7000/reset-password/${id}/${token}`,{
    password
   
  });
   
    console.log(res);
    return res;
    
  } catch (error) {
    console.error("Signup API Error:");
    throw new Error("Failed to sign up.",error);
  }
};



export {login,viewProfileAPI,logoutAPI,signup,forgotPasswordAPI,resetPasswordAPI};