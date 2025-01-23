import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";


const Login = () => {
    const [emailId, setEmailId] = useState("sharv@gmail.com");
    const [password, setPassword] = useState("Demo@123");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
        const res= await axios.post(BASE_URL+"/login",{emailId,password},{withCredentials:true});
        // console.log("it is login data",res.data);
        dispatch(addUser(res.data));
        navigate("/feed");
        
        }catch(err){
            console.error(err);
        }
    } 
    

    return (
        <>
            <div className="flex justify-center my-10">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Login</h2>
                        <div>

                            <label className="form-control w-full max-w-xs py-2">
                                <div className="label">
                                    <span className="label-text">Email ID</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs py-2">
                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>

                        </div>
                        <div className="card-actions justify-center m-2">
                            <button className="btn btn-primary"
                                onClick={handleLogin}
                            >Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login