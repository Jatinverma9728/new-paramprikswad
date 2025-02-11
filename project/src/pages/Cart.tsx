import React from "react";
import { useStore } from "../store/useStore";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const subtotal = cart.reduce((sum, item) => {
    const price = item.selectedSize?.price || item.sizes[0].price;
    return sum + price * item.quantity;
  }, 0);
  const shipping = subtotal > 150 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-amber-800 mb-8">
          Add some products to your cart to continue shopping.
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
      <h2 className="text-2xl font-bold text-amber-900 mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-amber-900">
                  {item.name}
                </h3>
                <p className="text-amber-700">
                  Size: {item.selectedSize?.size || item.sizes[0].size}
                </p>
                <p className="text-amber-900 font-bold">
                  ₹
                  {(item.selectedSize?.price || item.sizes[0].price).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(0, item.quantity - 1))
                  }
                  className="p-1 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 rounded-full bg-red-100 text-red-500 hover:bg-red-200 ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600">
              Proceed to Checkout
            </button>
            <p className="text-sm text-amber-700 mt-4">
              Free shipping on orders over ₹150
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
