import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { ShoppingCart, Trash2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductSize } from "../types";

export const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [selectedSizes, setSelectedSizes] = useState<
    Record<string, ProductSize>
  >(
    Object.fromEntries(
      wishlist.map((p) => [p.id, p.selectedSize || p.sizes[0]])
    )
  );

  const handleSizeChange = (productId: string, size: ProductSize) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          Your wishlist is empty
        </h2>
        <p className="text-amber-800 mb-8">
          Save items you like to your wishlist for later.
        </p>
        <Link
          to="/products"
          className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-amber-900 mb-8">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                {item.name}
              </h3>
              <div className="relative mb-4">
                <select
                  value={selectedSizes[item.id]?.size || item.sizes[0].size}
                  onChange={(e) => {
                    const size = item.sizes.find(
                      (s) => s.size === e.target.value
                    );
                    if (size) handleSizeChange(item.id, size);
                  }}
                  className="w-full appearance-none bg-amber-50 border border-amber-200 text-amber-900 py-2 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {item.sizes.map((size) => (
                    <option key={size.size} value={size.size}>
                      {size.size} - ₹{size.price}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-700 pointer-events-none" />
              </div>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-amber-900">
                  ₹{selectedSizes[item.id]?.price || item.sizes[0].price}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      addToCart({
                        ...item,
                        selectedSize: selectedSizes[item.id],
                      })
                    }
                    className="bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
