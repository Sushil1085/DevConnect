import axios from "axios";
import { data } from "react-router-dom";

const login =async(data)=>{
console.log(data,"from api file");

  try {
    const response = await axios.post("http://localhost:7000/login", data);
    return response;
  } catch (error) {
    console.error("Login API Error:");
    throw new Error("Failed to log in.");
  }
}

const addUser =async(userData)=>{
    const response =await fetch('http://localhost:7000/signup',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(userData)
    })
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

export {login,addUser,editUserAPI};