import React,{ useState} from "react";
import { viewProfileAPI, logoutAPI } from "../api/api";
import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const queryClient = new QueryClient()

const Profile = () => {

    const navigate = useNavigate();

    const [deletePopUp, setDeletePopUp] = useState(false);


    const { data, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: viewProfileAPI,
    })

    // console.log(data,"Profile data");

    const { mutate } = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            navigate("/");
        },
        onError: (err) => {
            console.error(err);
        }
    })



    const handleLogout = () => {
        setDeletePopUp(true);
        // mutate();
    }

    return (<>

        {isLoading && <div>Loading...</div>}
        {data ? (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <div className="flex flex-col max-w-md p-6 dark:bg-gray-50 dark:text-gray-800">
                    <img src={data.photoURL} alt="" className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square" />
                    <div>
                        <h2 className="text-xl font-semibold">{data.firstName} {data.lastName} </h2>
                        <h3 className="block pb-2 text-sm dark:text-gray-600">{data.emailId}</h3>
                        <h3 className="block pb-2 text-sm dark:text-gray-600">{data.gender}</h3>
                        <h3 className="block pb-2 text-sm dark:text-gray-600">{(data.skills).join(", ")}</h3>
                        <h3 className="block pb-2 text-sm dark:text-gray-600">{data.about}</h3>
                    </div>
                </div>
                <div className="">
            <button onClick={handleLogout} type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mt-[640px] ml-[-250px]">logout</button>
            </div>
            </div>

        ) : (<h1>Please Login</h1>)}

        {deletePopUp && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Are you sure you want to logout?</h2>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setDeletePopUp(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => mutate()}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>

    )
};

export default Profile;