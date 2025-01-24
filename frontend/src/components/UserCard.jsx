import { use } from "react";

const UserCard=({user})=>{
    // console.log(user,"from card");
    
    return(
    <>
     <div className="card bg-base-300 w-96 shadow-xl">
                <figure>
                    <img
                        src={user.photoURL}
                        alt="Photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user.firstName+" "+user.lastName}</h2>
                    <p>{user.age+", "+user.gender}</p>
                    <p>{user.about}</p>
                    <div className="card-actions justify-end my-4">
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-primary">Send Request</button>
                    </div>
                </div>
            </div>
    </>
)
}

export default UserCard;