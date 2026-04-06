import React from "react";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

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

            if (res.data.message  === "User Already Exists"){
              alert("User Already  Exists")
              return;
            }else{
              alert("Signup Successful");
            }
          navigate("/")
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
          value={formData.name}
          placeholder="Name"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="email"
          name = "email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="password"
          name= "password"
          onChange={handleChange}
          value={formData.password}
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