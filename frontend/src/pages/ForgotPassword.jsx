import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAPI } from "../api/api";
import { useNavigate } from "react-router-dom";




const ForgotPassword = () => {

const [emailId, setEmailId] = useState("");


    const{mutate,isLoading}=useMutation({
        mutationFn:forgotPasswordAPI,
        onSuccess:(data)=>{
            console.log(data);
            
        },
        onError:(err)=>{
            console.error(err);
        }
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate({ emailId: emailId });
      };
    
    
    return(
       <>
       
       <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit} >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  onChange={(e) => setEmailId(e.target.value)}
                  value={emailId}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Email Address"
                  required
                />
              </div>
          
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Confirm
              </button>
             
            </form>
          </div>
        </div>
      </div>
    </section>
       
       </>
    )
}

export default ForgotPassword;