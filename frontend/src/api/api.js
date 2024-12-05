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
    console.log(response.data,"from api file");
    return response.data;
   
    
  }catch(err){
    console.error("Login API Error:");
    throw new Error("Failed to log in.");
  }
}

const editUserAPI =async(updatedUser)=>{
    const response =await fetch(`http://localhost:7000/profile/edit`,updatedUser,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(userData)
    })
}

export {login,viewProfileAPI,editUserAPI};