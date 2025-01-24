import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";

const Requests=()=>{
    const dispatch=useDispatch();
    const requests=useSelector((state)=>state.requests);

    const fetchRequests=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/requests/received",{
                withCredentials:true
            });
            console.log(res.data.data);
            dispatch(addRequest(res.data.data))
        }catch(err){
            console.error(err);
        }
            }

    useEffect(()=>{
        fetchRequests();
    },[])

    if (!requests || requests.length === 0) {
        return (
            <h1 className="font-bold text-2xl">No requests Found</h1>
        );
    }
        return (
            <div className="text-center my-10">
                <h1 className="text-bold text-white text-3xl">Requests</h1>
                {
                    requests.map((request)=>{
                        const {photoURL,age,gender,about,firstName,lastName}=request.fromUserId;
                        return(
                            <div 
                            key={request._id}
                            className="flex items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
                                <div>
                                <img alt="photo" className="w-20 h-20 rounded-full" src={photoURL}></img>
                                </div>
                                <div className="text-left m-4">
                                <h2 className="text-bold text-xl">{firstName+" "+lastName}</h2>
                                <p>{age+", "+gender}</p>
                                <p>{about}</p>
                                </div>
                                <div>
                                <button className="btn btn-primary mx-4">Accept</button>
                                <button className="btn btn-primary">Reject</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
}

export default Requests;