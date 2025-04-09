import React, { useState } from 'react'
import { axiosInstance } from "../lib/axios"
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Mail, Lock ,UserPlus} from "lucide-react";

const SignupPage = () => {
  const{setAuthUser}=useAuthStore()
  const[formData,setFormData]=useState({
    username:"",
    email:"",
    password:""

  })

  const handleChange = (e)=>{
    const{name,value}=e.target
    setFormData({
      ...formData,[name]:value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post('/auth/signup', formData);
      if (response.data) {
        console.log("sign up successfully"); 
        setAuthUser(response.data)
        
      } else {
        console.log("unsuccessfull sign up");
      }
    } catch (error) {
      console.log(error.response.data )
    }
  }


  // return (
  //   <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
  //     <h2>Signup</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>Username</label>
  //         <input
  //           type="text"
  //           name="username"
  //           value={formData.username}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label>Email</label>
  //         <input
  //           type="email"
  //           name="email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label>Password</label>
  //         <input
  //           type="password"
  //           name="password"
  //           value={formData.password}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <button type="submit">Sign Up</button>
  //     </form>
  //     <div >
  //           <p>
  //             Already have an account?{" "}
  //             <Link to="/login">
  //               Sign in
  //             </Link>
  //           </p>
  //     </div>
  //   </div>
  // )
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <UserPlus className="absolute left-3 top-3 text-gray-400"/>
            <input
              type="text"
              name="username"
              placeholder="UserName"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
          Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage