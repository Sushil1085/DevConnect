import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        if (feed) return;
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
    }, [])

    return (
        
          feed && (<div className="flex justify-center my-10">
            <UserCard user={feed[0]}/>
           </div>)
        
    )
}

export default Feed;