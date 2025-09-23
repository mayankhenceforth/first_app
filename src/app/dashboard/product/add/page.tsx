'use client'

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; 
import Image from "next/image";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    images: [] as string[],
    category: "",
    subCategory: "",
    originalPrice: "",
    currentPrice: "",
    unit: "",
    stock: "",
    more_details: {} as Record<string, string>,
  });

  const [fieldName, setFieldName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setData((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
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
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium">Product Name</label>
            <Input
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <Textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={3}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full mt-1 p-2 border rounded-lg cursor-pointer"
            />

            {data.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {data.images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`Preview ${idx}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <Select
              value={data.category}
              onValueChange={(val) => setData((prev) => ({ ...prev, category: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="grocery">Grocery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* SubCategory */}
          <div>
            <label className="block text-gray-700 font-medium">Sub Category</label>
            <Select
              value={data.subCategory}
              onValueChange={(val) => setData((prev) => ({ ...prev, subCategory: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sub Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobiles">Mobiles</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Original Price</label>
              <Input
                type="number"
                name="originalPrice"
                value={data.originalPrice}
                onChange={handleChange}
                placeholder="₹"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Current Price</label>
              <Input
                type="number"
                name="currentPrice"
                value={data.currentPrice}
                onChange={handleChange}
                placeholder="₹"
                required
              />
            </div>
          </div>

          {/* Unit & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Unit</label>
              <Input
                name="unit"
                value={data.unit}
                onChange={handleChange}
                placeholder="kg, liter, pcs"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Stock</label>
              <Input
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                placeholder="Enter stock"
                required
              />
            </div>
          </div>

          {/* Dynamic Extra Fields */}
          <div className="space-y-2">
            {Object.keys(data.more_details).map((key, idx) => (
              <div key={idx}>
                <label className="block text-gray-700 font-medium capitalize">{key}</label>
                <Input
                  value={data.more_details[key]}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      more_details: { ...prev.more_details, [key]: e.target.value },
                    }))
                  }
                />
              </div>
            ))}

            <div className="flex gap-2">
              <Input
                placeholder="Add custom field name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="flex-1"
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
