import React from "react";
import "./i18n";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Cart } from "./pages/Cart";
import { Wishlist } from "./pages/Wishlist";
import { Login } from "./pages/Login";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { ShippingPolicy } from "./pages/ShippingPolicy";
import { ClerkProvider } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log('Clerk Key:', clerkPubKey); // Debug log

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
  </div>
);

const App = () => {
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      appearance={{
        elements: {
          rootBox: "w-full",
          card: "bg-transparent shadow-none",
          formButtonPrimary: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
          formFieldInput: "border-amber-200 focus:border-amber-500",
        }
      }}
    >
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in/*" element={<Login isSignUp={false} />} />
              <Route path="/sign-up/*" element={<Login isSignUp={true} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
};

export default App;
