import React from "react";
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="p-4 container m-auto sticky top-0 left-0 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Cinema </h1>
      <div className="space-x-6">
        <Link href="/" className="hover:text-gray-200">Home</Link>
        <Link href="/about" className="hover:text-gray-200">About</Link>
        <Link href="/contact" className="hover:text-gray-200">Contact</Link>
      </div>
    </nav>
  );
};

export default Nav;
