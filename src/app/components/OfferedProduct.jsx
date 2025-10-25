"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function OfferProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchOfferProducts() {
            try {
                const res = await fetch("/api/products", { method: "GET" });
                const data = await res.json();
                if (data.success) {
                    const filtered = data.message
                        .filter(p => p.discount && p.discount > 0)
                        .sort((a, b) => b.discount - a.discount)
                        .slice(0, 6);
                    setProducts(filtered);
                }
            } catch (err) {
                console.error("Offer products fetch error:", err);
            }
        }
        fetchOfferProducts();
    }, []);

    return (
        <div className="py-3 sm:px-0 px-4 flex flex-col gap-y-3 sm:mt-3">
            <div className="flex items-center justify-between">
                <h1 className="sm:text-2xl text-xl font-bold text-[#f85606] mb-5 w-full pb-2 border-b border-b-[#f85606]">
                    ধামাকা অফার
                </h1>
                <Link href='/components/offered' className="w-28 sm:w-24 px-2 py-1.5 text-sm bg-[#f85606] rounded-md text-white -mt-3 text-center">আরো দেখুন</Link>
            </div>

            {products.length === 0 ? (
                <div className="w-full flex justify-center items-center py-20">
                    <div className="flex space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {products.map((p) => (
                        <div key={p._id} className="bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer hover:shadow-2xl transition">
                            <div className="relative">
                                <Link href={`/components/products/${p._id}`}>
                                    <img
                                        src={p.product_image[0]}
                                        alt={p.product_name}
                                        className="h-36 sm:h-44 w-full object-cover transition-transform duration-500 transform hover:scale-110"
                                    />
                                </Link>

                                {/* ডিসকাউন্ট ব্যাজ */}
                                {p.discount > 0 && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                        -{p.discount}%
                                    </div>
                                )}
                            </div>

                            <div className="p-3 flex flex-col justify-between">
                                <h4 className="line-clamp-2 leading-5 font-semibold text-gray-800 mb-1">{p.product_name}</h4>

                                <div className="w-full flex flex-col gap-y-1 items-start justify-center">
                                    {p.discount > 0 ? (
                                        <div className="flex items-center justify-center gap-x-2">
                                            <p className="text-[#f85606] font-bold text-lg sm:text-2xl -mt-1">৳ {Math.round(p.price - (p.price * p.discount) / 100)}</p>
                                            <p className="text-gray-400 line-through text-sm">৳ {p.price}</p>
                                        </div>
                                    ) : (
                                        <p className="text-[#f85606] font-bold text-lg sm:text-2xl -mt-1">৳ {p.price}</p>
                                    )}

                                    <Link className="w-full" href={`/components/products/order/${p._id}`}>
                                        <button className="w-full flex items-center justify-center gap-1 px-2 py-2 text-xs sm:text-sm bg-[#933100] hover:bg-[#b43a00] text-white rounded-lg">
                                            <ShoppingCart className="w-4 h-4 -mt-0.5" /> অর্ডার করুন
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
