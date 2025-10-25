'use client';
import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    {
        label: "অর্গানিক খাবার",
        value: "organic_food",
        image: "/categories/organic-food.jpg",
        description: "অর্গানিক খাবার আমাদের স্বাস্থ্যের জন্য নিরাপদ এবং পুষ্টিকর। আমরা তাজা, মানসম্মত ও খাঁটি অর্গানিক পণ্য সরবরাহ করি।"
    },
    {
        label: "কনস্ট্রাকশন",
        value: "construction",
        image: "/categories/construction.jpg",
        description: "কনস্ট্রাকশন বিভাগের পণ্য গুণগতমান এবং স্থায়িত্ব নিশ্চিত করে। আপনার নির্মাণ কাজ সহজ ও মসৃণ হবে।"
    },
    {
        label: "ইলেকট্রিক",
        value: "electric",
        image: "/categories/eletronics.jpg",
        description: "ইলেকট্রিক পণ্যসমূহে আমরা সরবরাহ করি নিরাপদ, আধুনিক এবং দীর্ঘস্থায়ী বৈদ্যুতিক সরঞ্জাম।"
    },
    {
        label: "হার্ডওয়্যার",
        value: "hardware",
        image: "/categories/hardware.webp",
        description: "হার্ডওয়্যার বিভাগে আপনি পাবেন উচ্চমানের যন্ত্রাংশ এবং সরঞ্জাম, যা প্রতিদিনের কাজ সহজ করে।"
    },
    {
        label: "স্যানিটারি",
        value: "sanitary",
        image: "/categories/sanitary.jpg",
        description: "স্যানিটারি পণ্য আমাদের পরিচ্ছন্নতা ও স্বাস্থ্য বজায় রাখতে সাহায্য করে। আমরা মানসম্মত পণ্য সরবরাহ করি।"
    },
    {
        label: "রুফিং ও আলবেস্টার",
        value: "roofing_albestar",
        image: "/categories/roofing.jpg",
        description: "রুফিং এবং আলবেস্টার পণ্য দিয়ে বাড়ি বা অফিসের ছাদ শক্তিশালী ও দীর্ঘস্থায়ী হয়।"
    },
    {
        label: "গ্যাস সিলিন্ডার",
        value: "gas_cylinder",
        image: "/categories/gas.jpg",
        description: "গ্যাস সিলিন্ডার নিরাপদ এবং মানসম্মত। আমরা সরবরাহ করি চেক করা এবং সঠিক গ্যাস সিলিন্ডার।"
    },
    {
        label: "কুকারিজ ও কিচেন",
        value: "cookeries_kitchen",
        image: "/categories/cooking.jpg",
        description: "কুকারিজ এবং কিচেন আইটেম আমাদের দৈনন্দিন রান্না ও খাবার প্রস্তুতি সহজ করে এবং মানসম্মত।"
    },
];

export default function AboutPage() {
    return (
        <div className="sm:w-10/12 mx-auto py-5 sm:py-10 px-4 flex flex-col sm:gap-y-8 gap-y-0">

            {/* সাবটাইটেল */}
            <motion.h2
                className="text-xl sm:text-2xl font-semibold text-[#f85606] text-center mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                আমাদের উদ্দেশ্য, মান এবং ক্যাটাগরি
            </motion.h2>

            {/* বিবরণ */}
            <motion.p
                className="text-gray-700 text-base sm:text-lg leading-relaxed text-justify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                স্বাগতম! আমরা আমাদের গ্রাহকদের জন্য সর্বোত্তম মানের পণ্য এবং সার্ভিস নিশ্চিত করার জন্য প্রতিশ্রুতিবদ্ধ।
                আমাদের লক্ষ্য গ্রাহকদের দৈনন্দিন প্রয়োজনীয় পণ্য সহজ, সাশ্রয়ী এবং নির্ভরযোগ্যভাবে পৌঁছে দেওয়া। নিচে আমাদের ক্যাটাগরির বিস্তারিত বিবরণ দেওয়া হলো:
            </motion.p>

            {/* ক্যাটাগরি লিস্ট */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
                {categories.map((cat, index) => (
                    <motion.div
                        key={cat.value}
                        className="bg-[#ff5500] border border-[#933100] text-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="h-36 sm:h-44 overflow-hidden bg-white">
                            <img
                                src={cat.image}
                                alt={cat.label}
                                className="h-full transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                        <div className="p-2 sm:p-4 text-center">
                            <h3 className=" font-semibold text-lg sm:text-xl border-b">{cat.label}</h3>
                            <p className="text-sm mt-1">{cat.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ফাইনাল নোট */}
            <motion.p
                className="text-gray-700 text-base sm:text-lg mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                আমাদের সাথে থাকুন এবং উপভোগ করুন সেরা মানের পণ্য, নির্ভরযোগ্য সার্ভিস, এবং সর্বোত্তম অভিজ্ঞতা। আমরা প্রতিশ্রুতিবদ্ধ যে প্রতিটি গ্রাহক আমাদের কাছ থেকে খুশি হবেন।
            </motion.p>
        </div>
    );
}
