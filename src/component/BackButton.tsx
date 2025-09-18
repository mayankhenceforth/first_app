"use client";

import Link from "next/link";
import React from "react";

interface BackButtonProps {
  href?: string; 
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href = "/", label = "Back" }) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
    >
      <span className="text-lg">&#8592;</span> 
      {label}
    </Link>
  );
};

export default BackButton;
