import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";


const UserCard=({user,loadPage,setLoadPage})=>{
    const dispatch=useDispatch();

    const handleRequest=async(status,_id)=>{
        try{
            const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+user._id,{},{
                withCredentials:true
            })
            setLoadPage(!loadPage);
            dispatch(removeFeed(user._id));
        }catch(err){
            console.error(err);
        }
    }
    
    return(
    <>
     <div className="card bg-base-300 w-96 shadow-xl">
                <figure>
                    <img
                        src={user.photoURL}
                        alt="Photo" />
                </figure>
                <div 
                key={user._id}
                className="card-body">
                    <h2 className="card-title">{user.firstName+" "+user.lastName}</h2>
                    <p>{user.age+", "+user.gender}</p>
                    <p>{user.about}</p>
                    <div className="card-actions justify-end my-4">
                        <button className="btn btn-primary"
                        onClick={()=>handleRequest("ignored",user._id)}
                        >Ignore</button>
                        <button className="btn btn-primary"
                            onClick={()=>handleRequest("interested",user._id)}
                        >Send Request</button>
                    </div>
                </div>
            </div>
    </>
)
}

export default UserCard;