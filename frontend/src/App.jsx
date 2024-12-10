import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login'
import Profile  from './pages/Profile';
import SignUp  from './pages/SignUp';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {

  return (
    <>
      <Router>  
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Login />} />
          <Route path='/profile/view' element={<Profile />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        </Routes>
      </Router>











      <div className='bg-gray'>
        {/* <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            User Information
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your first name"
              className="input block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="firstName"
              defaultValue={editUser?.firstName || ''}
            />
            <input
              type="text"
              placeholder="Enter your last name"
              className="input block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="lastName"
              defaultValue={editUser?.lastName || ''}
            />
            <input
              type="email"
              placeholder="Enter your email ID"
              className="input block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="emailId"
              defaultValue={editUser?.emailId || ''}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="input block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
            />
            <input
              type="number"
              placeholder="Enter your age"
              className="input block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="age"
              defaultValue={editUser?.age || ''}
            />
            <input
              type="text"
              placeholder="Enter your gender"
              className="input block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="gender"
              defaultValue={editUser?.gender || ''}
            />
          </div>

          <button
            type="submit"
            disabled={isPosting}
            className={`w-full mt-6 py-3 rounded-lg text-white font-semibold 
      ${isPosting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300'}`}
          >
            {isPosting ? 'Submitting...' : 'Submit'}
          </button>
        </form> */}

        {/* <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">First Name</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Last Name</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Age</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Gender</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Actions</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Photo</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{user.firstName}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.lastName}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.emailId}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.age}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.gender}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <button className="text-blue-500 hover:text-blue-700">Edit</button>
                  <button className="ml-2 text-red-500 hover:text-red-700">Delete</button>
                </td>
                <td className="px-4 py-2">
                  <img
                    src={user.photoURL}
                    alt={user.firstName}
                    className="w-16 h-16 object-cover rounded-full border border-gray-300"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>

    </>
  );
}

export default App;
