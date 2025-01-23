import { Outlet, useNavigate, useNavigation } from "react-router";
import Navbar from "./components/NavBar";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";

const Body=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData=useSelector((state)=>state.user);


    const fetchUser =async()=>{
        try {const res=await axios.get(BASE_URL+"/profile/view",{
            withCredentials:true
        });
        dispatch(addUser(res.data));
        // console.log(res.data);
        
    }catch(err){
        if(err.status===401){
            navigate("/login")
            console.error(err); 
        }
    }
}

    useEffect(()=>{
        if(!userData){
        fetchUser();
        }
    },[])
    return(
        <>
        <Navbar />
        <Outlet />
        
        </>
    )
}

export default Body;