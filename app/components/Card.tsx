import React from "react";
import { Product } from "../types/index";

interface CardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
}
export default function Card({ product, onAddToCart, className }: CardProps) {
  const { id, title, price, img, category, description } = product;
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        className || ""
      }`}
    >
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover"
        loading="lazy"
        onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
      />
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{category}</p>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
        <p className="text-xl font-bold text-gray-800 mb-4">
          ${price.toFixed(2)}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 cursor-pointer"
          aria-label={`Add ${title} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
