import { useState } from "react";
const EditProfile=()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error,setError]=useState(false);
    return(
        <div className="flex justify-center my-10">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>

                            <label className="form-control w-full max-w-xs py-2">
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs py-2">
                                <div className="label">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                        </div>
                        {error===true?<p className="text-red-500">ERROR Message is here!!!</p>:""}
                        
                        <div className="card-actions justify-center m-2">
                            <button className="btn btn-primary"
                                // onClick={handleLogin}
                            >Login</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default EditProfile;