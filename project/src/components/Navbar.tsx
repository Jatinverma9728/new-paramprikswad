import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, Heart, User } from "lucide-react";
import { useStore } from "../store/useStore";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, wishlist, user } = useStore();

  return (
    <nav className="bg-amber-50 fixed w-full z-50 top-0 left-0 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-amber-800 logo-font"
            >
              Paramprik Swad
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-amber-900 hover:text-amber-700 px-3 py-2"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-amber-900 hover:text-amber-700 px-3 py-2"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-amber-900 hover:text-amber-700 px-3 py-2"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-amber-900 hover:text-amber-700 px-3 py-2"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-amber-900" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link to="/wishlist" className="relative p-2">
              <Heart className="h-6 w-6 text-amber-900" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to={user.isAuthenticated ? "/profile" : "/login"}
              className="p-2"
            >
              <User className="h-6 w-6 text-amber-900" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <Menu className="h-6 w-6 text-amber-900" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-amber-900 hover:text-amber-700 block px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-amber-900 hover:text-amber-700 block px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-amber-900 hover:text-amber-700 block px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-amber-900 hover:text-amber-700 block px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
