'use client';
import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [whitelist, setWhitelist] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("whitelist")) || [];
        setWhitelist(saved);
    }, []);

    useEffect(() => {
        async function fetchAllProducts() {
            try {
                const res = await fetch("/api/products", { method: "GET" });
                const data = await res.json();
                if (data.success) {
                    setProducts(data.message);
                }
            } catch (err) {
                console.error("All products fetch error:", err);
            }
        }
        fetchAllProducts();
    }, []);


    const toggleWhitelist = (product) => {
        let updated = [];
        if (whitelist.some((p) => p._id === product._id)) {
            updated = whitelist.filter((p) => p._id !== product._id);
        } else {
            updated = [...whitelist, product];
        }
        setWhitelist(updated);
        localStorage.setItem("whitelist", JSON.stringify(updated));
    };

    const isWhitelisted = (id) => whitelist.some((p) => p._id === id);

    return (
        <div className="py-3 sm:px-0 px-4 flex flex-col gap-y-3 sm:mt-3" >
            <div className="flex items-center justify-between">
                <h1 className="sm:text-2xl text-xl font-bold text-[#f85606] mb-5 w-full pb-2 border-b border-b-[#f85606]">
                    সকল পণ্য
                </h1>
                <Link href='/components/products' className="w-28 sm:w-24 px-2 py-1.5 text-sm bg-[#f85606] rounded-md text-white -mt-3 text-center">আরো দেখুন</Link>
            </div>

            {
                products.length === 0 ? (
                    <div className="w-full flex justify-center items-center py-20">
                        <div className="flex space-x-2">
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                    </div>

                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                        <AnimatePresence>
                            {products.slice(-12).reverse().map((p) => {
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
                                        className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:shadow-xl transition"
                                    >
                                        {/* Product Image */}

                                        <div className="relative overflow-hidden h-36 sm:h-44 flex justify-center items-center">
                                            {p.discount > 0 && (
                                                <div className="absolute top-2 right-2 z-20 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                                    -{p.discount}%
                                                </div>
                                            )}
                                            <Link href={`/components/products/${p._id}`}>
                                                <img
                                                    src={p.product_image[0]}
                                                    alt={p.product_name}
                                                    className="w-full object-cover transition-transform duration-500 transform hover:scale-110"
                                                />
                                            </Link>
                                        </div>

                                        {/* Product Details */}
                                        <div className="p-3 flex flex-col justify-between">
                                            <h4 className="line-clamp-2 leading-5 font-semibold text-gray-800 mb-1">
                                                {p.product_name}
                                            </h4>

                                            {/* দাম + ডিসকাউন্ট */}
                                            {discountedPrice ? (
                                                <div className="flex items-center justify-start gap-x-2 sm:gap-x-3">
                                                    <div className="flex items-center gap-x-1 sm:gap-x-2">
                                                        <p className="text-[#f85606] text-lg sm:text-2xl font-bold">৳ {discountedPrice}</p>
                                                        <p className="text-gray-400 line-through text-xs sm:text-sm mt-1">৳ {p.price}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-[#f85606] font-bold text-lg sm:text-2xl">৳ {p.price}</p>
                                            )}

                                            {/* Buttons */}
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
                )
            }
        </div >
    );
}
