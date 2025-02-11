import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      className="relative bg-amber-50 border-t border-amber-100 overflow-hidden h-100"
      style={{ height: "97svh" }}
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/images/2f74fc9020624fb09059c766e538177a.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to ensure text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

      {/* Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-20 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>
              Paramprik Swad brings authentic Indian spices and groceries right
              to your doorstep. Experience the true taste of India with our
              premium quality products.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li>Email: swadparamprik@gmail.com</li>
              <li>Phone: (+19) 81990845** , 93069641**</li>
              <li>
                Address: Paramprik Swad, Near Gyatri School, MC colony,
                <br />
                Bhiwani Haryana, India
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-600">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-amber-600">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-amber-600">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-200">
          <p className="text-center">
            © {new Date().getFullYear()} Paramprik Swad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
