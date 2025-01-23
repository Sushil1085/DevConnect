import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar =()=>{
const user=useSelector((state)=>state.user);
// console.log(user);
const navigate=useNavigate();
const dispatch=useDispatch();

const handleLogout=async()=>{
  try{
    const res=await axios.post(BASE_URL+"/logout",{},{
      withCredentials:true
    });
    dispatch(removeUser());
    navigate("/login");
  }catch(err){
    console.error(err);
  }
}

    return(
        <div className="navbar bg-base-300">
  <div className="flex-1">
    <a onClick={()=>navigate("/feed")} className="btn btn-ghost text-xl">DevConnect</a>
  </div>
  <div className="flex-none gap-2">
   
    <div className="dropdown dropdown-end mx-6">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={
              user===null? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" : user?.photoURL
            }>
              
            </img>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to={"/profile"} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link >
        </li>
        <li><Link to={"/connections"}>Connections</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    )
}

export default Navbar