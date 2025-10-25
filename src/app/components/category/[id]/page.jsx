'use client';
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AllProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [whitelist, setWhitelist] = useState([]);

    // ✅ সব প্রোডাক্ট আনা
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products", { method: "GET" });
                const data = await res.json();
                if (data.success) {
                    const filtered = data.message.filter(p => p.category === id);
                    setProducts(filtered);
                }
            } catch (err) {
                console.error("Products fetch error:", err);
            }
        }
        if (id) fetchProducts();
    }, [id]);

    // ✅ wishlist লোড
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('whitelist')) || [];
        setWhitelist(saved);
    }, []);

    const toggleWhitelist = (product) => {
        let updated = [];
        if (whitelist.some((p) => p._id === product._id)) {
            updated = whitelist.filter((p) => p._id !== product._id);
        } else {
            updated = [...whitelist, product];
        }
        setWhitelist(updated);
        localStorage.setItem('whitelist', JSON.stringify(updated));
    };

    const isWhitelisted = (id) => whitelist.some((p) => p._id === id);

    // ✅ নতুন Muntaha ক্যাটাগরি লিস্ট
    const categories = [
        { label: "🥬 অর্গানিক ফুড", value: "organic_food" },
        { label: "🏗 কনস্ট্রাকশন", value: "construction" },
        { label: "⚡ ইলেকট্রিক", value: "electric" },
        { label: "🔩 হার্ডওয়্যার", value: "hardware" },
        { label: "🚿 স্যানিটারি", value: "sanitary" },
        { label: "🧱 ঢেউটিন ও এলবেস্টার", value: "roofing_albestar" },
        { label: "🔥 গ্যাস সিলিন্ডার", value: "gas_cylinder" },
        { label: "🍳 কুকারিজ ও কিচেন আইটেমস", value: "cookeries_kitchen" },
    ];

    const currentCategory = categories.find(cat => cat.value === id)?.label || "সব পণ্য";

    if (!products || products.length === 0) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="sm:w-10/12 mx-auto py-5 sm:px-0 px-4 flex flex-col gap-y-4">
            <h1 className="sm:text-3xl text-xl font-bold text-[#f85606] mb-3 w-full pb-2 border-b border-[#f85606]">
                {currentCategory}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                <AnimatePresence>
                    {products.slice().reverse().map((p) => {
                        const discountedPrice = p.discount && p.discount > 0
                            ? Math.round(p.price - (p.price * p.discount) / 100)
                            : null;

                        return (
                            <motion.div
                                key={p._id}
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:shadow-lg transition"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden h-36 sm:h-44 flex justify-center items-center">
                                    {p.discount > 0 && (
                                        <div className="absolute top-2 left-2 z-20 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                            -{p.discount}%
                                        </div>
                                    )}
                                    <Link href={`/components/products/${p._id}`}>
                                        <img
                                            src={Array.isArray(p.product_image) ? p.product_image[0] : p.product_image}
                                            alt={p.product_name}
                                            className="w-full object-cover transition-transform duration-500 transform hover:scale-110"
                                        />
                                    </Link>
                                </div>

                                {/* Product Details */}
                                <div className="p-3 flex flex-col justify-between gap-y-1">
                                    <h4 className="line-clamp-2 leading-5 font-semibold text-gray-800 mb-1">
                                        {p.product_name}
                                    </h4>

                                    {/* দাম + ডিসকাউন্ট */}
                                    {discountedPrice ? (
                                        <div className="flex items-center gap-x-2">
                                            <p className="text-[#f85606] text-lg font-bold">৳ {discountedPrice}</p>
                                            <p className="text-gray-400 line-through text-xs">৳ {p.price}</p>
                                        </div>
                                    ) : (
                                        <p className="text-[#f85606] font-bold text-lg">৳ {p.price}</p>
                                    )}

                                    {/* Buttons */}
                                    <div className="flex justify-between gap-2 mt-2">
                                        <button
                                            onClick={() => toggleWhitelist(p)}
                                            className={`flex items-center sm:w-auto w-16 gap-1 px-2 py-1 text-xs sm:text-sm rounded transition ${isWhitelisted(p._id)
                                                ? "bg-[#933100] text-white shadow-sm hover:shadow-md"
                                                : "bg-[#f4e5dd] text-[#933100] hover:bg-[#eed3c0] shadow-sm hover:shadow-md"
                                                }`}
                                        >
                                            <Heart className={`w-3 hidden -mt-1 sm:inline h-3 sm:w-4 sm:h-4 ${isWhitelisted(p._id) ? "text-white" : "text-[#933100]"}`} />
                                            {isWhitelisted(p._id) ? "রিমুভ" : "Wishlist"}
                                        </button>

                                        <Link href={`/components/products/order/${p._id}`} className="flex-1">
                                            <button className="w-full flex items-center justify-center gap-1 px-2 py-1 text-xs sm:text-sm bg-[#f85606] hover:bg-[#9a3300] text-white rounded shadow-sm hover:shadow-md">
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
        </div>
    );
}
