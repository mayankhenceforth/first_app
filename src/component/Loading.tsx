import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-6"></div>

      {/* Loading text with animated dots */}
      <div className="text-gray-700 text-lg font-medium flex items-center gap-1">
        <span>Loading</span>
        <span className="animate-ping">.</span>
        <span className="animate-ping animation-delay-200">.</span>
        <span className="animate-ping animation-delay-400">.</span>
      </div>
    </div>
  );
};

export default Loading;
