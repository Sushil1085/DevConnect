import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const [loadPage, setLoadPage] = useState(false);
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        
        try {
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true
            });
            // console.log(res.data.data);
            dispatch(addFeed(res.data.data))

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getFeed();
    }, [loadPage]);

    if(feed.length===0){
        return(
            <div className="flex justify-center my-10">
                <h1 className="text-2xl font-bold">No users to show</h1>
            </div>
        )
    }

    return (
        
          feed && (<div className="flex justify-center my-10">
            <UserCard 
                user={feed[0]}
                loadPage={loadPage}
                setLoadPage={setLoadPage}
                />
           </div>)
        
    )
}

export default Feed;