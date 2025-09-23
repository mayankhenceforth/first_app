'use client'
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaUserCircle, FaWallet, FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Nav = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Mumbai");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-gray-400 text-white px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50 backdrop-blur">
      {/* Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/image/download-removebg-preview.png"
          alt="Logo"
          key="logo"
          width={80}
          height={80}
          className="w-20 h-20 object-contain"
          priority
        />
      </div>

      {/* Search */}
      <div className="flex flex-1 items-center justify-center mx-6">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <label htmlFor="search-input" className="sr-only">
            Search
          </label>
          <input
            id="search-input"
            type="text"
            name="search"
            aria-label="Search"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 rounded-lg text-black w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            aria-label="Search button"
            className="absolute right-3 top-2 text-gray-700 hover:text-yellow-500"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Profile, Wallet, Location */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 bg-gray-800 px-3 py-1 rounded-md">
          <FaMapMarkerAlt />
          <span>{location}</span>
        </div>

        <button aria-label="Wallet" className="hover:text-yellow-400 transition-colors">
          <FaWallet size={24} />
        </button>
        <button aria-label="User Profile" className="hover:text-yellow-400 transition-colors">
          <FaUserCircle size={28} />
        </button>
      </div>
    </nav>
  );
};

export default React.memo(Nav);