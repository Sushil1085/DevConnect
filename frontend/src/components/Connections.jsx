import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants"; 
import { addConnections } from "../utils/connectionsSlice";
import {useDispatch, useSelector }from "react-redux"

const Connections = () => {
    const dispatch=useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });
            // console.log(res.data.data);
            dispatch(addConnections(res.data.data))

        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchConnections();
    }, []);

  if (!connections || connections.length === 0) {
    return (
        <h1 className="font-bold text-2xl">No Connection Found</h1>
    );
}
    return (
        <div 
        key={connections._id}
        className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>
            {
                connections.map((connection)=>{
                    const {photoURL}=connection;
                    return(
                        <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                            <div>
                            <img alt="photo" className="w-20 h-20 rounded-full" src={photoURL}></img>
                            </div>
                            <div className="text-left m-4">
                            <h2 className="text-bold text-xl">{connection.firstName+" "+connection.lastName}</h2>
                            <p>{connection.age+", "+connection.gender}</p>
                            <p>{connection.about}</p>
                            </div>
                            
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Connections;