"use client";

import Image from "next/image";
import Link from "next/link";

export default function CategoriesPage() {
    const categories = [
        {
            label: "অর্গানিক খাবার",
            value: "organic_food",
            image: "/categories/organic-food.jpg"
        },
        {
            label: "কনস্ট্রাকশন ",
            value: "construction",
            image: "/categories/construction.jpg"
        },
        {
            label: "ইলেকট্রিক ",
            value: "electric",
            image: "/categories/eletronics.jpg"
        },
        {
            label: "হার্ডওয়্যার ",
            value: "hardware",
            image: "/categories/hardware.webp"
        },
        {
            label: "স্যানিটারি ",
            value: "sanitary",
            image: "/categories/sanitary.jpg"
        },
        {
            label: "রুফিং ও আলবেস্টার ",
            value: "roofing_albestar",
            image: "/categories/roofing.jpg"
        },
        {
            label: "গ্যাস সিলিন্ডার",
            value: "gas_cylinder",
            image: "/categories/gas.jpg"
        },
        {
            label: "কুকারিজ ও কিচেন ",
            value: "cookeries_kitchen",
            image: "/categories/cooking.jpg"
        },
    ];

    return (
        <div className="py-3 sm:px-0 px-4 flex flex-col gap-y-5">
            <h1 className="sm:text-2xl text-xl font-bold text-[#f85606] sm:mb-5 mb-3 w-full pb-2 border-b border-b-[#f85606]">
                আমাদের ক্যাটাগরি
            </h1>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 md:gap-5 pb-4">
                {categories.map((cat) => (
                    <div
                        key={cat.value}
                        className="flex flex-col items-center cursor-pointer group"
                    >
                        <Link
                            href={`/components/category/${cat.value}`}
                            className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition duration-300"
                        >
                            <Image
                                src={cat.image}
                                alt={cat.label}
                                width={300}
                                height={300}
                                className="h-full group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                        </Link>

                        <p className="mt-2 text-center text-sm sm:text-base font-semibold text-[#f85606] group-hover:text-[#9a3300] transition-colors duration-300">
                            {cat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
