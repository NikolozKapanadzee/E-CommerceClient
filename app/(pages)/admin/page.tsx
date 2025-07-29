"use client";
import React, { useState, useEffect } from "react";
import { X, Plus, Upload, LogOut } from "lucide-react";
import { ProductFormData, ValidationErrors } from "../../types/index";
import { axiosInstance } from "../../lib/axiosInstance";

export default function AdminPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    itemName: "",
    description: "",
    price: "",
    category: "",
    img: null,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");

      setRole(storedRole);

      if (token && storedRole === "admin") {
        setAuthToken(token);
        console.log("Admin token found and validated");
      } else if (token && storedRole !== "admin") {
        console.error("User is not an admin. Role:", storedRole);
      } else {
        console.error("No auth token found in localStorage");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthToken(null);
    window.location.href = "/login";
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        img: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      if (errors.img) {
        setErrors((prev) => ({
          ...prev,
          img: "",
        }));
      }
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    if (!authToken) throw new Error("No authentication token found");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Image upload failed:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error("Authentication failed. Please log in again.");
      }
      throw new Error("Failed to upload image");
    }
  };

  const createProduct = async (productData: {
    itemName: string;
    description: string;
    price: number;
    category: string;
    img: string[];
  }) => {
    if (!authToken) throw new Error("No authentication token found");

    try {
      const response = await axiosInstance.post("/products", productData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Product creation failed:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error("Authentication failed. Please log in again.");
      }
      throw new Error("Failed to create product");
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      if (!authToken) {
        alert("No authentication token found. Please log in again.");
        return;
      }

      if (
        !formData.itemName ||
        !formData.description ||
        !formData.price ||
        !formData.category ||
        !formData.img
      ) {
        setErrors({
          itemName: !formData.itemName ? "Item name is required" : "",
          description: !formData.description ? "Description is required" : "",
          price: !formData.price ? "Price is required" : "",
          category: !formData.category ? "Category is required" : "",
          img: !formData.img ? "Image is required" : "",
        });
        return;
      }

      const priceNumber = Number(formData.price);
      if (isNaN(priceNumber) || priceNumber <= 0) {
        setErrors({ price: "Please enter a valid price" });
        return;
      }

      const imageUrl = await uploadImage(formData.img);
      const productData = {
        itemName: formData.itemName,
        description: formData.description,
        price: priceNumber,
        category: formData.category,
        img: [imageUrl],
      };

      await createProduct(productData);
      alert("Product added successfully!");

      setFormData({
        itemName: "",
        description: "",
        price: "",
        category: "",
        img: null,
      });
      setImagePreview(null);
      setIsPopupOpen(false);
    } catch (error: any) {
      console.error("Error:", error);
      if (error.message.includes("Authentication failed")) {
        alert("Your session has expired. Please log in again.");
        handleLogout();
      } else {
        alert(error.message || "An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      itemName: "",
      description: "",
      price: "",
      category: "",
      img: null,
    });
    setErrors({});
    setImagePreview(null);
    setIsPopupOpen(false);
  };

  if (!authToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {role && role !== "admin"
              ? "Admin Access Required"
              : "Authentication Required"}
          </h1>
          <p className="text-gray-600 mb-4">
            {role && role !== "admin"
              ? `Your current role is "${role}". Admin privileges are required to access this panel.`
              : "No authentication token found. Please log in first."}
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow flex items-center gap-2"
        >
          ← Back
        </button>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all flex items-center gap-2 mx-auto"
        >
          <Plus size={24} />
          Add Products
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Product
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {[
                {
                  label: "Item Name",
                  name: "itemName",
                  type: "text",
                  value: formData.itemName,
                  error: errors.itemName,
                },
                {
                  label: "Description",
                  name: "description",
                  type: "textarea",
                  value: formData.description,
                  error: errors.description,
                },
                {
                  label: "Price",
                  name: "price",
                  type: "number",
                  value: formData.price,
                  error: errors.price,
                },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                        field.error ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                        field.error ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                  {field.error && (
                    <p className="mt-1 text-sm text-red-600">{field.error}</p>
                  )}
                </div>
              ))}
              <div>
                <label
                  htmlFor="img"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Image
                </label>
                <label
                  htmlFor="img"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                    errors.img ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center pt-5 pb-6">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-md mb-2"
                      />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, JPEG (MAX. 5MB)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="img"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                {errors.img && (
                  <p className="mt-1 text-sm text-red-600">{errors.img}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="headphones">Headphones</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="laptops">Laptops</option>
                  <option value="tablets">Tablets</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
