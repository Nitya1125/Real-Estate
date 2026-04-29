import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      // ❌ Error cases
      if (res.data.message === "User Not Found") {
        alert("User Not Found");
        return;
      }

      if (res.data.message === "Invalid Credential") {
        alert("Wrong Password");
        return;
      }

      // ✅ SUCCESS
      if (res.data.message === "Login Successfully") {
        alert("Login Successful");

        // ✅ SAVE TOKEN
        localStorage.setItem("token", res.data.token);

        // ✅ SAVE USER (VERY IMPORTANT)
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ ROLE BASED NAVIGATION
        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }

    } catch (error) {
      console.log(error);
      alert("Login error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <button
          className="w-full bg-black text-white py-3 rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="flex justify-center mb-4 mt-4">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await axios.post(
                  "http://localhost:5000/api/auth/google",
                  {
                    token: credentialResponse.credential
                  }
                );

                // ✅ SAVE TOKEN + USER
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                alert("Google Login Success");

                if (res.data.user.role === "admin") {
                  navigate("/admin");
                } else {
                  navigate("/");
                }

              } catch (err) {
                console.log(err);
                alert("Google Login error");
              }
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>

        <p className="text-sm text-center mt-4">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;