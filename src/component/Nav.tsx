"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaUserCircle, FaWallet, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import logo from '../../public/image/download-removebg-preview.png';
// import { Inter } from 'next/font/google';

const Nav = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Mumbai"); 
  // const inter = Inter({ subsets: ['latin'] });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className={`bg-gray-400 text-white px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50 `}>
      {/* Logo */}
      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => router.push("/")}>
        <Image src={logo} alt="Logo" width={80} height={80} className="sm:w-24 sm:h-24" />
      </div>

      {/* Search */}
      <div className="flex flex-1 items-center justify-center mx-6">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 rounded-md text-black w-full focus:outline-none"
          />
          <button type="submit" className="absolute right-2 top-2 text-gray-700">
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Profile, Wallet, Location */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 bg-gray-800 px-2 py-1 rounded-md">
          <FaMapMarkerAlt />
          <span>{location}</span>
        </div>
        <FaWallet size={24} className="cursor-pointer hover:text-yellow-400 transition-colors" />
        <FaUserCircle size={28} className="cursor-pointer hover:text-yellow-400 transition-colors" />
      </div>
    </nav>
  );
};

export default Nav;
