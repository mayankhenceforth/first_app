"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const validValue = Object.values(data).every((value) => value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("data", data)
    try {
      const response = await axios({
        url: 'https://server-two-brown.vercel.app/api/user/login',
        method: 'post',
        data: data,
        withCredentials: true
      })

      toast.success("Login successful");
      router.push("/");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        toast.error("Error setting up login request");
      }
    }
  };

  return (
    <div className="min-h-[200px] md:w-[550px] w-[90%] my-4 m-auto border border-gray-100  rounded-lg flex flex-col items-center justify-center shadow-2xl py-3 gap-3">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-[1.8rem] font-semibold text-black">Login Form</h2>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-[90%] md:w-[80%] p-2 bg-gray-200 rounded-md outline-0"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Enter your password"
        className="w-[90%] md:w-[80%] p-2 bg-gray-200 rounded-md outline-0"
        name="password"
        value={data.password}
        onChange={handleChange}
      />
      <div className="w-[90%] md:w-[80%] flex justify-end">
        <a href="/forgotpassword" className="text-blue-600 cursor-pointer">
          Forgot password
        </a>
      </div>
      <button
        disabled={!validValue}
        type="submit"
        className={`${validValue ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-600"
          } w-[90%] md:w-[80%] p-2 rounded-md outline-0 text-white tracking-wide`}
        onClick={handleSubmit}
      >
        Login
      </button>

      <p>
        Create new Account?{" "}
        <a href="/register" className="text-blue-600 cursor-pointer">
          Register
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
