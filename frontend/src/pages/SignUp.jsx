import React from 'react'
import { useState } from 'react';
const SignUp = () => {

    const [data,setData]=useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        age: "",
        gender: "",
        photoURL: "",
        skills: [],
        about :""
    });

console.log(data);
const handleChange = (e) => {
    setData({
      ...data,       // Spread the old data
      [e.target.name]: e.target.value // Dynamically update the property
    });
  };


    return (
        <div class="font-[sans-serif]">
        <div class="min-h-screen flex flex-col items-center justify-center p-6">
          <div class="grid lg:grid-cols-2 items-center gap-6 max-w-7xl max-lg:max-w-xl w-full">
         
            <form class="lg:max-w-md w-full">
              <h3 class="text-gray-800 text-3xl font-extrabold mb-12">Create Profile</h3>
              <div class="space-y-6">
       
                <div>
                  <label for="firstName" class="text-gray-800 text-sm mb-2 block">First Name</label>
                  <input
                  onChange={handleChange}
                  value={data.firstName}
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" 
                    placeholder="Enter name" 
                    aria-label="Enter your name" 
                  />
                </div>
                <div>
                  <label for="lastName" class="text-gray-800 text-sm mb-2 block">Last Name</label>
                  <input 
                   onChange={handleChange}
                   value={data.lastName}
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" 
                    placeholder="Enter Last name" 
                    aria-label="Enter your name" 
                  />
                </div>
               
               
                <div>
                  <label for="emailId" class="text-gray-800 text-sm mb-2 block">Email</label>
                  <input 
                   onChange={handleChange}
                   value={data.emailId}
                    id="emailId" 
                    name="emailId" 
                    type="email" 
                    class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" 
                    placeholder="Enter email" 
                    aria-label="Enter your email"
                  />
                </div>
                <div>
                  <label for="age" class="text-gray-800 text-sm mb-2 block">Age</label>
                  <input 
                     onChange={handleChange}
                     value={data.age}
                    id="age" 
                    name="age" 
                    type="number" 
                    class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" 
                    placeholder="Enter Last Number" 
                    aria-label="Enter your name" 
                  />
                </div>

                <div>
                  <label for="gender" class="text-gray-800 text-sm mb-2 block">gender</label>
                  <input 
                     onChange={handleChange}
                     value={data.gender}
                    id="gender" 
                    name="gender" 
                    type="text" 
                    class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" 
                    placeholder="Enter gender" 
                    aria-label="Enter your name" 
                  />
                </div>

                <div>
                  <label for="photoURL" class="text-gray-800 text-sm mb-2 block">photoURL</label>
                  <input 
                     onChange={handleChange}
                     value={data.photoURL}
                    id="photoURL" 
                    name="photoURL" 
                    type="text" 
                    class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" 
                    placeholder="Enter photoURL" 
                    aria-label="Enter your name" 
                  />
                </div>

                <div>
                  <label for="skills" class="text-gray-800 text-sm mb-2 block">skills</label>
                  <input 
                     onChange={handleChange}
                     value={data.skills}
                    id="skills" 
                    name="skills" 
                    type="text" 
                    class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" 
                    placeholder="Enter skills" 
                    aria-label="Enter your name" 
                  />
                </div>

                <div>
                  <label for="about" class="text-gray-800 text-sm mb-2 block">about</label>
                  <input 
                     onChange={handleChange}
                     value={data.about}
                    id="about" 
                    name="about" 
                    type="text" 
                    class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" 
                    placeholder="Enter about" 
                    aria-label="Enter your name" 
                  />
                </div>
      
                <div>
                  <label for="password" class="text-gray-800 text-sm mb-2 block">Password</label>
                  <input 
                     onChange={handleChange}
                     value={data.password}
                    id="password" 
                    name="password" 
                    type="password" 
                    class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all" 
                    placeholder="Enter password" 
                    aria-label="Enter your password"
                  />
                </div>
   
                <div class="flex items-center">
                  <input 
                    id="remember-me" 
                    name="remember-me" 
                    type="checkbox" 
                    class="h-4 w-4 shrink-0 border-gray-300 rounded" 
                    aria-label="Accept terms and conditions"
                  />
                  <label for="remember-me" class="ml-3 block text-sm text-gray-800">
                    I accept the 
                    <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                  </label>
                </div>
              </div>
      
           
              <div class="mt-12">
                <button 
                  type="submit" 
                  class="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Create an account
                </button>
              </div>
       
              <p class="text-sm text-gray-800 mt-6">
                Already have an account? 
                <a href="/" class="text-blue-600 font-semibold hover:underline ml-1">Login here</a>
              </p>
            </form>
      
            <div class="flex items-center justify-center">
              <img 
                src="https://readymadeui.com/login-image.webp" 
                alt="Registration Visual" 
              />
            </div>
          </div>
        </div>
      </div>
      
    )
}
export default SignUp;