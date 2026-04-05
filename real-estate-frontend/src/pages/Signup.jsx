import React from "react";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit= async(e) =>{
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
            console.log(res.data);
            alert("Signup Successful")
        }catch(error){
            console.log(error)
        }
        
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up
        </h2>

        <input
          type="text"
          name = "name"
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="email"
          name = "email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="password"
          name= "password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <button onClick={handleSubmit} className="w-full bg-black text-white py-3 rounded-lg">
          Create Account
        </button>

      </div>

    </div>
  );
};

export default Signup;