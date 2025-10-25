'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function ProductDetails({ product }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    if (!product) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        )
    }

    const discountedPrice =
        product.discount && product.discount > 0
            ? Math.round(product.price - (product.price * product.discount) / 100)
            : null

    const deliveryCharge = Number(product.deliveryCharge) || 0

    // 🧮 মোট দাম (মূল্য + ডেলিভারি চার্জ)
    const totalWithDelivery = (discountedPrice ?? product.price) + deliveryCharge

    const images = product.product_image?.length ? product.product_image : ['/logo/placeholder.jpg']

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <motion.div
            className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-6 border border-gray-100">

                {/* 🖼️ ইমেজ স্লাইডার */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-50 p-4 rounded-xl relative">
                    <div className="relative w-full flex justify-center items-center">
                        <Zoom>
                            <img
                                src={images[currentIndex]}
                                alt={`${product.product_name} ${currentIndex + 1}`}
                                className="h-[400px] md:h-[500px] object-contain rounded-xl shadow-md cursor-zoom-in transition-transform hover:scale-105"
                            />
                        </Zoom>

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 md:left-4 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 md:right-4 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    <div className="flex gap-2 mt-4 flex-wrap justify-center">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-16 w-16 object-cover rounded-lg cursor-pointer border-2 transition-transform ${currentIndex === idx
                                    ? 'border-[#f85606] scale-105'
                                    : 'border-transparent opacity-70 hover:opacity-100'
                                    }`}
                                alt={`Thumbnail ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* 📄 ডিটেইলস */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-[#f85606] break-words">
                            {product.product_name || "Unnamed Product"}
                        </h1>

                        {product.details ? (
                            <p className="text-gray-700 mt-2 leading-relaxed">{product.details}</p>
                        ) : (
                            <p className="text-gray-400 mt-2">বিস্তারিত পাওয়া যায়নি।</p>
                        )}

                        {/* 💰 দাম ও ডিসকাউন্ট */}
                        <div className="mt-4 flex flex-col gap-2">
                            {discountedPrice ? (
                                <div className="flex flex-wrap items-center gap-3">
                                    <p className="text-2xl font-bold text-[#f85606]">৳ {discountedPrice}</p>
                                    <p className="text-gray-400 line-through">৳ {product.price}</p>
                                    <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
                                        -{product.discount}%
                                    </span>
                                </div>
                            ) : (
                                <p className="text-2xl font-bold text-[#f85606]">৳ {product.price}</p>
                            )}

                            {/* 🚚 ডেলিভারি চার্জ */}
                            <p className="text-gray-700 text-sm">ডেলিভারি চার্জ: ৳ {deliveryCharge}</p>

                            {/* 🧮 সর্বমোট */}
                            <p className="text-lg font-bold text-green-700">
                                সর্বমোট: ৳ {totalWithDelivery}
                            </p>
                        </div>
                    </div>

                    {/* 🛒 অর্ডার বাটন */}
                    <Link
                        href={`/components/products/order/${product._id}?price=${totalWithDelivery}`}
                        className="w-full mt-6"
                    >
                        <button className="w-full px-6 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#f85606] to-blue-500 hover:from-[#e14d00] hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105">
                            <ShoppingCart className="w-5 h-5" /> এখনই অর্ডার করুন
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
