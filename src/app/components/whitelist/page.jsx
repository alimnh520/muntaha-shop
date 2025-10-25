'use client';
import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function WhiteList() {
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);

    // ✅ localStorage থেকে ডেটা লোড
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem("whitelist")) || [];
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setWishlist(savedWishlist);
        setOrders(savedOrders);
    }, []);

    const removeFromWhitelist = (productId) => {
        const updated = wishlist.filter(p => p._id !== productId && p.id !== productId);
        localStorage.setItem("whitelist", JSON.stringify(updated));
        setWishlist(updated);
    };

    if (wishlist.length === 0 && orders.length === 0) {
        return (
            <div className="sm:w-10/12 mx-auto sm:px-0 px-4 flex flex-col items-center justify-center gap-y-3 sm:mt-3 py-20">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="sm:w-10/12 mx-auto py-3 sm:px-0 px-4 flex flex-col gap-y-6 sm:mt-3">
            {/* 💖 Wishlist Section */}
            <div>
                <h1 className="sm:text-2xl text-xl font-bold text-[#f85606] mb-5 w-full pb-2 border-b border-b-[#f85606]">
                    আমার হোয়াইটলিস্ট
                </h1>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                        <AnimatePresence>
                            {wishlist.slice().reverse().map((product) => {
                                const discountedPrice = product.discount && product.discount > 0
                                    ? Math.round(product.price - (product.price * product.discount) / 100)
                                    : null;

                                return (
                                    <motion.div
                                        key={product._id || product.id}
                                        layout
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 50 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:shadow-xl transition"
                                    >
                                        <div className="relative overflow-hidden h-36 sm:h-44 flex justify-center items-center">
                                            {product.discount > 0 && (
                                                <div className="absolute top-2 right-2 z-20 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                                    -{product.discount}%
                                                </div>
                                            )}
                                            <Link href={`/components/products/${product._id || product.id}`}>
                                                <img
                                                    src={product.product_image[0]}
                                                    alt={product.product_name}
                                                    className="w-full object-cover transition-transform duration-500 transform hover:scale-110"
                                                />
                                            </Link>
                                        </div>

                                        <div className="p-3 flex flex-col justify-between">
                                            <h4 className="line-clamp-2 leading-5 font-semibold text-gray-800 mb-1">
                                                {product.product_name}
                                            </h4>

                                            {discountedPrice ? (
                                                <div className="flex items-center justify-start gap-x-2 sm:gap-x-3">
                                                    <div className="flex items-center gap-x-1 sm:gap-x-2">
                                                        <p className="text-[#f85606] text-lg sm:text-2xl font-bold">৳ {discountedPrice}</p>
                                                        <p className="text-gray-400 line-through text-xs sm:text-sm mt-1">৳ {product.price}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-[#f85606] font-bold text-lg sm:text-2xl">৳ {product.price}</p>
                                            )}

                                            <div className="flex justify-between gap-2 mt-2">
                                                {/* ❤️ রিমুভ */}
                                                <button
                                                    onClick={() => removeFromWhitelist(product._id || product.id)}
                                                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs sm:text-sm 
               bg-[#933100] hover:bg-[#b43a00] text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                                                >
                                                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" /> রিমুভ
                                                </button>

                                                {/* 🛒 অর্ডার */}
                                                <Link href={`/components/products/order/${product._id || product.id}`} className="flex-1">
                                                    <button
                                                        className="w-full flex items-center justify-center gap-1 px-2 py-1 text-xs sm:text-sm 
                 bg-[#f4e5dd] hover:bg-[#eed3c0] text-[#933100] font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                                                    >
                                                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" /> অর্ডার
                                                    </button>
                                                </Link>
                                            </div>

                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                ) : (
                    <p className="text-center text-[#f85606]">হোয়াইটলিস্ট খালি</p>
                )}
            </div>

            {/* 📦 Order Section */}
            <div>
                <h1 className="sm:text-2xl text-xl font-bold text-[#f85606] mb-5 w-full pb-2 border-b border-b-[#f85606]">
                    আমার অর্ডারসমূহ
                </h1>

                {orders.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                        <AnimatePresence>
                            {orders.slice().reverse().map((order, idx) => (
                                <motion.div
                                    key={idx}
                                    layout
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:shadow-xl transition"
                                >
                                    {/* 🖼️ Product Image */}
                                    <div className="relative overflow-hidden h-36 sm:h-44 flex justify-center items-center">
                                        <img
                                            src={order.productImage}
                                            alt={order.productName}
                                            className="w-full object-cover transition-transform duration-500 transform hover:scale-110"
                                        />
                                    </div>

                                    {/* 📦 Product Info */}
                                    <div className="p-3 flex flex-col justify-between">
                                        <h4 className="line-clamp-2 leading-5 font-semibold text-gray-800 mb-2">
                                            {order.productName}
                                        </h4>

                                        {/* 💰 Price Details */}
                                        <div className="space-y-1 text-sm text-gray-700">
                                            <p>পণ্যের দাম: <span className="font-semibold text-[#f85606]">৳ {order.price}</span></p>
                                            <p>পরিমাণ: <span className="font-semibold">{order.quantity} টি</span></p>
                                            <p>ডেলিভারি চার্জ: <span className="font-semibold text-blue-600">৳ {order.deliveryCharge || 140}</span></p>
                                            <p>মোট দাম (পণ্য): <span className="font-semibold">৳ {order.price * order.quantity}</span></p>
                                            <p className="border-t pt-1 mt-1 text-base font-bold text-[#f85606]">
                                                সর্বমোট: ৳ {order.totalPrice}
                                            </p>
                                        </div>

                                        {/* 👤 Customer Info */}
                                        <div className="mt-2 text-xs text-gray-500">
                                            <p>{order.name}</p>
                                            <p>{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                    </div>
                ) : (
                    <p className="text-center text-[#f85606]">কোনো অর্ডার দেওয়া হয়নি</p>
                )}
            </div>
        </div>
    );
}
