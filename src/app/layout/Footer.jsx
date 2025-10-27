'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const categories = [
    { label: "সব", value: "all", emoji: "🛍️" },
    { label: "অর্গানিক ফুড", value: "organic_food" },
    { label: "কনস্ট্রাকশন", value: "construction" },
    { label: "ইলেকট্রিক", value: "electric" },
    { label: "হার্ডওয়্যার", value: "hardware" },
    { label: "স্যানিটারি", value: "sanitary" },
    { label: "ঢেউটিন ও এলবেস্টার", value: "roofing_albestar" },
    { label: "গ্যাস সিলিন্ডার", value: "gas_cylinder" },
    { label: "কুকারিজ ও কিচেন আইটেমস", value: "cookeries_kitchen" },
];

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-green-50 via-white to-green-50 text-gray-800 border-t border-t-[#f85606] mt-12">
            <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16 py-10 flex flex-col md:flex-row justify-between gap-10">

                {/* Brand & About */}
                <div className="flex flex-col gap-4 md:w-1/3">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo/my-logo.png"
                            alt="Logo"
                            className="h-16 w-auto rounded-md object-cover shadow-sm"
                        />
                        <p className="logo-font text-2xl text-[#f85606] font-bold">MUNTAHA MULTI TRADE</p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        🏗️ আমাদের প্রতিষ্ঠান সরবরাহ করে নির্মাণ সামগ্রী, ইলেকট্রিক ও হার্ডওয়্যার পণ্য,
                        স্যানিটারি আইটেম, ঢেউটিন, গ্যাস সিলিন্ডার, কুকারিজ এবং অর্গানিক ফুড।
                        মানের নিশ্চয়তা এবং গ্রাহক সন্তুষ্টিই আমাদের লক্ষ্য। 💚
                    </p>
                </div>

                {/* Categories & Quick Links */}
                <div className="flex flex-col sm:flex-row md:w-1/3 gap-6">
                    {/* Categories */}
                    <div className="flex-1 text-[#f85606]">
                        <h4 className="text-lg font-semibold mb-2 border-b border-[#f85606]">Categories</h4>
                        <ul className="flex list-disc list-inside flex-col gap-1 text-sm text-gray-700">
                            {categories.map(cat => (
                                <li key={cat.value}>
                                    <Link href={`/components/category/${cat.value}`} className="hover:text-[#f85606] transition">
                                        {cat.emoji} {cat.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="text-[#f85606]">
                        <h4 className="text-lg font-semibold mb-2 border-b border-[#f85606]">Quick Links</h4>
                        <ul className="flex list-disc list-inside flex-col gap-1 text-sm text-gray-700">
                            <li><Link href="/" className="hover:text-[#f85606] transition">Home</Link></li>
                            <li><Link href="/components/about" className="hover:text-[#f85606] transition">About</Link></li>
                            <li><Link href="/components/contact" className="hover:text-[#f85606] transition">Contact</Link></li>
                            <li><Link href="/components/products" className="hover:text-[#f85606] transition">Products</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact & Social */}
                <div className="flex flex-col md:w-1/3 gap-4">
                    <h4 className="text-lg font-semibold mb-2 border-b border-[#f85606] text-[#f85606]"> আমাদের ঠিকানা</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#f85606]" />
                            <span>নতুন বাজার-কাশিমাড়ী, শ্যামনগর - সাতক্ষীরা</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#f85606]" />
                            <a href="tel:+880138194740" className="hover:text-[#f85606] transition">+880 13781-94740</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#f85606]" />
                            <a href="mailto:mostafizurrahman404434@gmail.com" className="hover:text-[#f85606] transition">
                                mostafizurrahman404434@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-3 mt-3">
                        <a href="https://www.facebook.com/abdullahonlineshoppingbd" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition">
                            <Facebook className="w-5 h-5 text-blue-600" />
                        </a>
                        <a href="https://wa.link/boep4i" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition">
                            <FaWhatsapp className="w-5 h-5 text-green-500" />
                        </a>
                        <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-green-100 transition">
                            <Instagram className="w-5 h-5 text-pink-500" />
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Section */}
            <div className="mt-8 pt-4 border-t border-[#f85606] flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 px-4 md:px-12">
                <p>© {new Date().getFullYear()} Nahid Hasan. সর্বস্বত্ব সংরক্ষিত।</p>
                <p className="flex items-center gap-2 mt-2 sm:mt-0">
                    💵 <span className="font-medium text-gray-700">Cash on Delivery</span>
                </p>
            </div>
        </footer>
    );
}
