'use client'
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function OfferProductsPage() {
    const [products, setProducts] = useState([]);
    const [whitelist, setWhitelist] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const categoriesRef = useRef(null);
    const isDragging = useRef(false);
    let startX, scrollLeft;

    const categories = [
        { label: "সব", value: "all", emoji: "🛍️" },
        { label: " অর্গানিক ফুড", value: "organic_food" },
        { label: " কনস্ট্রাকশন", value: "construction" },
        { label: " ইলেকট্রিক", value: "electric" },
        { label: " হার্ডওয়্যার", value: "hardware" },
        { label: " স্যানিটারি", value: "sanitary" },
        { label: " ঢেউটিন ও এলবেস্টার", value: "roofing_albestar" },
        { label: " গ্যাস সিলিন্ডার", value: "gas_cylinder" },
        { label: " কুকারিজ ও কিচেন আইটেমস", value: "cookeries_kitchen" },
    ];

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('whitelist')) || [];
        setWhitelist(saved);
    }, []);

    useEffect(() => {
        async function fetchOfferProducts() {
            try {
                const res = await fetch("/api/products", { method: "GET" });
                const data = await res.json();
                if (data.success) {
                    const filtered = data.message
                        .filter(p => p.discount && p.discount > 0)
                        .sort((a, b) => b.discount - a.discount);
                    setProducts(filtered);
                }
            } catch (err) {
                console.error("Offer products fetch error:", err);
            }
        }
        fetchOfferProducts();
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

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        let result = products;

        if (selectedCategory !== "all") {
            result = result.filter((p) => p.category === selectedCategory);
        }

        if (searchTerm.trim() !== "") {
            result = result.filter((p) =>
                p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return result;
    }, [products, searchTerm, selectedCategory]);

    // Mouse drag
    const onMouseDown = (e) => {
        isDragging.current = true;
        startX = e.pageX - categoriesRef.current.offsetLeft;
        scrollLeft = categoriesRef.current.scrollLeft;
    };
    const onMouseLeave = () => (isDragging.current = false);
    const onMouseUp = () => (isDragging.current = false);
    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - categoriesRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        categoriesRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="sm:w-10/12 mx-auto py-3 sm:px-0 px-4 flex flex-col gap-y-3 sm:mt-3">
            <h1 className="sm:text-3xl text-xl font-bold text-[#933100] mb-2 w-full pb-2 border-b border-[#933100]">
                ধামাকা অফার
            </h1>

            {/* 🔍 সার্চ */}
            <div className="flex items-center gap-2 mb-3 mt-1 sm:mt-3">
                <input
                    type="text"
                    placeholder="পণ্যের নাম লিখুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-[#933100] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#933100] text-[#933100]"
                />
                <button className="flex items-center gap-1 px-4 py-2 bg-[#933100] hover:bg-[#b43a00] text-white rounded-lg transition">
                    <Search className="w-4 h-4" /> সার্চ
                </button>
            </div>

            {/* 📂 ক্যাটাগরি */}
            <div
                ref={categoriesRef}
                className="overflow-x-auto py-2 cursor-grab select-none"
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                <div className="flex gap-3 px-2">
                    {categories.map((cat) => {
                        const active = selectedCategory === cat.value;
                        return (
                            <motion.button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-shrink-0 px-5 py-2 sm:py-3 rounded-2xl font-semibold text-sm sm:text-base flex items-center gap-2 transition-all
                  ${active
                                        ? 'bg-[#933100] text-white shadow-lg scale-105'
                                        : 'bg-gray-100 hover:bg-[#f4e5dd] text-[#933100]'
                                    }`}
                            >
                                {cat.label}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* 🧺 পণ্য লিস্ট */}
            {filteredProducts.length === 0 ? (
                <div className="w-full flex justify-center items-center py-20">
                    <div className="flex space-x-2">
                        <div className="w-4 h-4 bg-[#933100] rounded-full animate-bounce" />
                        <div className="w-4 h-4 bg-[#933100] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <div className="w-4 h-4 bg-[#933100] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-3 sm:mt-6">
                    <AnimatePresence>
                        {filteredProducts.map((p) => {
                            const discountedPrice =
                                p.discount && p.discount > 0
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
                                    className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-xl transition"
                                >
                                    <div className="relative overflow-hidden h-44 sm:h-52 flex justify-center items-center bg-gray-50">
                                        {p.discount > 0 && (
                                            <div className="absolute top-2 right-2 z-20 bg-[#933100] text-white text-xs font-bold px-2 py-1 rounded-full">
                                                -{p.discount}%
                                            </div>
                                        )}
                                        <Link href={`/components/products/${p._id}`}>
                                            <img
                                                src={p.product_image?.[0] || "/no-image.png"}
                                                alt={p.product_name}
                                                className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                                            />
                                        </Link>
                                    </div>

                                    <div className="p-3 flex flex-col justify-between">
                                        <h4 className="line-clamp-2 leading-5 font-semibold text-gray-800 mb-1">
                                            {p.product_name}
                                        </h4>

                                        {discountedPrice ? (
                                            <div className="flex items-center gap-x-2">
                                                <p className="text-[#933100] text-lg sm:text-2xl font-bold">৳ {discountedPrice}</p>
                                                <p className="text-gray-400 line-through text-xs sm:text-sm mt-1">৳ {p.price}</p>
                                            </div>
                                        ) : (
                                            <p className="text-[#933100] font-bold text-lg sm:text-2xl">৳ {p.price}</p>
                                        )}

                                        <div className="flex justify-between gap-2 mt-2">
                                            <button
                                                onClick={() => toggleWhitelist(p)}
                                                className={`flex items-center gap-1 px-2 py-1 text-xs sm:text-sm rounded-lg transition ${isWhitelisted(p._id)
                                                    ? "bg-[#933100] text-white"
                                                    : "bg-orange-50 hover:bg-orange-100 text-[#933100]"
                                                    }`}
                                            >
                                                <Heart className={`w-3 sm:w-4 h-3 sm:h-4 ${isWhitelisted(p._id) ? "text-white" : "text-[#933100]"}`} />
                                                Wishlist
                                            </button>

                                            <Link href={`/components/products/order/${p._id}`} className="flex-1">
                                                <button className="w-full flex items-center justify-center gap-1 px-2 py-1 text-xs sm:text-sm bg-[#933100] hover:bg-[#b43a00] text-white rounded-lg">
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
            )}
        </div>
    );
}
