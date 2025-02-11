import React from "react";

export const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-amber-900 mb-8">
        Shipping Policy
      </h2>
      <p className="text-amber-800 mb-4">
        We offer free shipping on orders over ₹150. For orders below ₹150, a
        flat shipping fee of ₹50 will be applied.
      </p>
      <p className="text-amber-800 mb-4">
        Orders are processed within 10 Minuts. Delivery times may vary depending
        on your location, but typically range from 20-30 Minuts.
      </p>
      <p className="text-amber-800">
        If you have any questions about our shipping policy, please contact us
        at swadparamprik@gmail.com.
      </p>
    </div>
  );
};
