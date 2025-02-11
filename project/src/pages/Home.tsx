import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronDown } from "lucide-react";
import { useStore } from "../store/useStore";
import { Product, ProductSize } from "../types";

// Featured products data
const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Organic Turmeric Powder",
    description:
      "Premium quality organic turmeric powder with high curcumin content.",
    price: 50,
    category: "Spices",
    image: "/images/turmric.jpg",
    type: "solid",
    sizes: [
      { size: "100g", price: 50 },
      { size: "200g", price: 100 },
    ],
    inStock: true,
  },
  {
    id: "2",
    name: "Pure Desi Ghee",
    description: "Traditional clarified butter made from pure cow milk.",
    price: 650,
    category: "Dairy",
    image: "/images/ghee.jpg",
    sizes: [
      { size: "200ml", price: 300 },
      { size: "500ml", price: 600 },
      { size: "1L", price: 1100 },
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Premium Basmati Rice",
    description: "Aged premium basmati rice with long grains.",
    category: "Rice",
    price: 230,
    image: "/images/rice-3506194_1920.jpg",
    type: "solid",
    sizes: [
      { size: "500g", price: 115 },
      { size: "1kg", price: 230 },
    ],
    inStock: true,
  },
  {
    id: "13",
    name: "Organic Pink salt/Sindha Salt",
    description: " Organic Pure & natural Pink salt/Sindha Salt Powder",
    category: "Salts",
    image: "/images/Pink-Salt-powder.jpg",
    type: "solid",
    sizes: [
      { size: "100g", price: 40 },
      { size: "200g", price: 80 },
    ],
  },
  {
    id: "12",
    name: "Organic Almond Oil",
    description: " Organic Pure & natural cold-pressed Almond Oil",
    category: "Oils",
    image: "/images/almond oil.jpg",
    type: "liquid",
    sizes: [
      { size: "100ml", price: 250 },
      { size: "200ml", price: 450 },
      { size: "500ml", price: 750 },
      { size: "1L", price: 1550 },
    ],
    inStock: true,
  },
  {
    id: "35",
    name: "Organic Bansi Gold Wheat Flour",
    description: "Organic MP 306 Natural Wheat flour",
    category: "Flours",
    image: "/images/organic aata.jpg",
    type: "solid",
    sizes: [
      { size: "200g", price: 40 },
      { size: "500g", price: 80 },
      { size: "1kg", price: 160 },
      { size: "2kg", price: 310 },
    ],
    inStock: true,
  },
  {
    id: "20",
    name: "Organic Jaggery Powder (Sakar)",
    description: "Organic, Pure & natural Jaggery powder (sakar)",
    category: "Natural Sweetness",
    image: "/images/sakar.jpg",
    type: "solid",
    sizes: [
      { size: "200g", price: 40 },
      { size: "500g", price: 80 },
      { size: "1kg", price: 160 },
    ],
  },
  {
    id: "22",
    name: "Mustard Honey",
    description: "Pure & natural Mustard Honey",
    category: "Honey",
    image: "/images/mustard honey.webp",
    type: "liquid",
    sizes: [
      { size: "100ml", price: 80 },
      { size: "200ml", price: 150 },
      { size: "500ml", price: 400 },
      { size: "1L", price: 750 },
    ],
  },
  {
    id: "27",
    name: "Moong Whole",
    description: "Pure & natural Moong Whole",
    category: "Pulses",
    image: "/images/green moong daal.webp",
    type: "solid",
    sizes: [
      { size: "200g", price: 40 },
      { size: "500g", price: 80 },
      { size: "1kg", price: 160 },
    ],
  },
];

export const Home = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [selectedSizes, setSelectedSizes] = useState<
    Record<string, ProductSize>
  >(Object.fromEntries(FEATURED_PRODUCTS.map((p) => [p.id, p.sizes[0]])));
  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };
  const handleSizeChange = (productId: string, size: ProductSize) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000"
            alt="Spices Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950/80 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold text-white mb-6">
                Authentic Indian Flavors
              </h1>
              <p className="text-xl text-amber-100 mb-8">
                Discover our premium collection of authentic Indian spices,
                grains, and traditional products.
              </p>
              <Link
                to="/products"
                className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">
            Our Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Spices",
                image:
                  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400",
                description: "Premium quality Indian spices",
                category: "Spices",
              },
              {
                title: "Dairy Products",
                image:
                  "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400",
                description: "Fresh dairy products including ghee and butter",
                category: "Dairy",
              },
              {
                title: "Grains & Pulses",
                image: "/images/moong daal.jpg",
                description: "Organic grains and pulses",
                category: "Pulses",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-amber-800 mb-4">{category.description}</p>
                  <Link
                    to={`/products?category=${category.category}`}
                    className="text-amber-700 hover:text-amber-600 font-medium"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-4">
            Featured Products
          </h2>
          <p className="text-amber-800 text-center mb-12 max-w-2xl mx-auto">
            Discover our handpicked selection of premium Indian groceries,
            carefully curated for authentic taste and quality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() =>
                        toggleWishlist({
                          ...product,
                          selectedSize: selectedSizes[product.id],
                        })
                      }
                      className={`p-2 rounded-full ${
                        isInWishlist(product.id)
                          ? "bg-red-50 text-red-500"
                          : "bg-white/90 text-amber-500 hover:bg-white"
                      } transition-colors`}
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-1">
                    {product.name}
                  </h3>
                  <div className="relative mb-4">
                    <select
                      value={selectedSizes[product.id].size}
                      onChange={(e) => {
                        const size = product.sizes.find(
                          (s) => s.size === e.target.value
                        );
                        if (size) handleSizeChange(product.id, size);
                      }}
                      className="w-full appearance-none bg-amber-50 border border-amber-200 text-amber-900 py-2 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {product.sizes.map((size) => (
                        <option key={size.size} value={size.size}>
                          {size.size}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-700 pointer-events-none" />
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-900">
                      ₹{selectedSizes[product.id].price}
                    </span>
                    <button
                      onClick={() =>
                        addToCart({
                          ...product,
                          selectedSize: selectedSizes[product.id],
                        })
                      }
                      className="flex items-center space-x-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-amber-100 text-amber-800 px-8 py-3 rounded-lg hover:bg-amber-200 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Parallax Section */}
      <div
        ref={parallaxRef}
        className="relative h-96 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Experience True Indian Flavors
            </h2>
            <p className="text-xl">Bringing authenticity to your kitchen</p>
          </div>
        </div>
      </div>
      {/* Organic Products Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">
            Why Choose Organic Products?
          </h2>
          <p className="text-amber-800 text-center mb-12 max-w-2xl mx-auto">
            Organic products are grown without the use of synthetic pesticides,
            fertilizers, or genetically modified organisms (GMOs). They are
            healthier for you and better for the environment. By choosing
            organic, you support sustainable farming practices and contribute to
            a healthier planet.
          </p>
        </div>
      </div>
      {/* Developer Section */}
      <div className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">
            Designed and Developed by
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/jatin pic.png"
                alt="Jatin Verma"
                className="w-32 h-32 rounded-full mx-auto mt-6"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Jatin Verma
                </h3>
                <p className="text-amber-800 mb-4">Web Developer & Designer</p>
                <p className="text-gray-600 text-sm mb-4">
                  web developer and UI/UX designer, known for creating
                  interactive and visually engaging digital experiences. With
                  expertise in JavaScript, GSAP, Swiper.js, and AI integrations,
                  he excels in building seamless, user-friendly websites and
                  e-commerce platforms that blend creativity with advanced
                  technology.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://jatinverma9728.github.io/portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:text-amber-600"
                  >
                    Portfolio
                  </a>
                  <a
                    href="www.linkedin.com/in/jatinverma9728"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:text-amber-600"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-6 flex items-center justify-center">
              <blockquote className="text-center text-amber-900 italic">
                "Experience the Paramparik Swad with our authentic & Organic
                Indian products."
                <br />
                <span className="text-amber-700 font-semibold">
                  - Paramprik swad
                </span>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
