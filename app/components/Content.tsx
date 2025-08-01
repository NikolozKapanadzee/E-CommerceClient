"use client";
import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import { axiosInstance } from "../lib/axiosInstance";
import { Product } from "../types/index";
import { useCart } from "../context/CartContext";

interface BackendProduct {
  _id: string;
  itemName: string;
  price: number;
  img: string[];
  category: string;
  description: string;
}

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL || "";

const Content: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const constructImageUrl = (imagePath: string): string => {
    if (!imagePath) return "/fallback-image.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    const cleanImagePath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;
    const baseUrl = S3_BASE_URL.endsWith("/") ? S3_BASE_URL : `${S3_BASE_URL}/`;

    return `${baseUrl}${cleanImagePath}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get<BackendProduct[]>("products");

        if (!S3_BASE_URL) {
          console.warn("S3_BASE_URL is not set. Image URLs may be invalid.");
        }
        const mappedProducts: Product[] = res.data.map((product) => ({
          id: product._id,
          title: product.itemName,
          price: product.price,
          img: product.img[0]
            ? constructImageUrl(product.img[0])
            : "/fallback-image.jpg",
          category: product.category,
          description: product.description,
        }));
        console.log("Mapped products with image URLs:", mappedProducts);
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleLoadMore = useCallback(() => {
    setVisibleProducts((prev) => prev + 8);
  }, []);

  const displayedProducts = products.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < products.length;

  if (loading) {
    return <div className="text-center mt-12">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center mt-12 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>

      {products.length === 0 && !loading && (
        <div className="text-center text-gray-500">No products available.</div>
      )}

      <div className="flex flex-wrap gap-6 justify-center">
        {displayedProducts.map((product) => (
          <Card
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            className="hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          />
        ))}
      </div>

      {hasMoreProducts && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            aria-label="Load more products"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Content;
