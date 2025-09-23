"use client";

import React, { useState } from "react";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    images: [],
    category: "",
    subCategory: "",
    originalPrice: "",
    currentPrice: "",
    unit: "",
    stock: "",
    more_details: {} as Record<string, string>,
  });

  const [fieldName, setFieldName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddField = () => {
    if (!fieldName.trim()) return;
    setData((prev) => ({
      ...prev,
      more_details: { ...prev.more_details, [fieldName]: "" },
    }));
    setFieldName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Product Data:", data);
    alert("Product Submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={3}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="grocery">Grocery</option>
            </select>
          </div>

          {/* SubCategory */}
          <div>
            <label className="block text-gray-700 font-medium">Sub Category</label>
            <select
              name="subCategory"
              value={data.subCategory}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Select Sub Category</option>
              <option value="mobiles">Mobiles</option>
              <option value="clothing">Clothing</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={data.originalPrice}
                onChange={handleChange}
                placeholder="₹"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Current Price</label>
              <input
                type="number"
                name="currentPrice"
                value={data.currentPrice}
                onChange={handleChange}
                placeholder="₹"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
          </div>

          {/* Unit & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Unit</label>
              <input
                type="text"
                name="unit"
                value={data.unit}
                onChange={handleChange}
                placeholder="kg, liter, pcs"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                placeholder="Enter stock"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
          </div>

          {/* Dynamic Extra Fields */}
          <div className="space-y-2">
            {Object.keys(data.more_details).map((key, idx) => (
              <div key={idx}>
                <label className="block text-gray-700 font-medium capitalize">{key}</label>
                <input
                  type="text"
                  value={data.more_details[key]}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      more_details: { ...prev.more_details, [key]: e.target.value },
                    }))
                  }
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            ))}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add custom field name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button
                type="button"
                onClick={handleAddField}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
