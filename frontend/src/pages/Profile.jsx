import React from "react";
import { viewProfileAPI} from "../api/api";
import { useQuery,QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()

const Profile = () => {


    const { data, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: viewProfileAPI,
      })
    
    console.log(data,"demdnjk");



    return(
        <div className="flex flex-col max-w-md p-6 dark:bg-gray-50 dark:text-gray-800">
	<img src="https://source.unsplash.com/200x200/?portrait?2" alt="" className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square" />
	<div>
		<h2 className="text-xl font-semibold">Leroy Jenkins</h2>
		<span className="block pb-2 text-sm dark:text-gray-600">CTO of Company Inc.</span>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
	</div>
</div>
    )
};

export default Profile;