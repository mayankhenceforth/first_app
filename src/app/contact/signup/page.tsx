'use client'

import axios from "axios";
import { NextResponse } from "next/server";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignUp() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.password !== data.confirm_password) {
            toast.error("Password and Confirm Password do not match. Please try again.");
            return;
        }

        try {
            const response = await axios({
                url: 'https://server-two-brown.vercel.app/api/user/register',
                method: 'post',
                data: data
            })
            if (response.status === 200) {
                toast.success("user registed....")
                const response = NextResponse.next()
                response.cookies.set({
                    name: '',
                    value: 'fast',
                    path: '/',
                })
            }


        } catch (error: any) {
            console.error(error.message || error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster /> {/* Toast renderer */}
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Create an Account
                </h1>

                <form className="space-y-4" onSubmit={handleOnSubmit}>
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="name"
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="email"
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="password"
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Re-enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="confirm_password"
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-4 text-center">
                    Already have an account?{" "}
                    <a href="login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
