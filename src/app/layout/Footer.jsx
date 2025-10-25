'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-green-50 via-white to-green-50 text-gray-800 border-t border-t-[#f85606] mt-12">
            <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand + About */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img
                                src="/logo/my-logo.jpg"
                                alt="Logo"
                                className="h-20 object-cover shadow-md"
                            />
                            {/* <p className="logo-font text-yellow-400 font-bold">
                                ABDULLAH ONLINE SHOP
                            </p> */}
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600">
                            🌱 অর্গানিক ফুড, 🏥 মেডিকেল সরঞ্জাম ও 🔌 মানসম্মত ইলেকট্রনিক্স — সবই এক ছাদের নিচে।<br />
                            ✅ নিরাপদ পণ্য <br />
                            ✅ দ্রুত ডেলিভারি <br />
                            ✅ সরাসরি গ্রাহক সেবা
                        </p>
                    </div>

                    {/* Gallery */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <h4 className="font-semibold text-lg text-gray-800 mb-2">
                            📸 আমাদের গ্যালারী
                        </h4>
                        <div className="sm:h-64 h-auto grid sm:grid-cols-2 sm:grid-rows-2 gap-4">
                            <img
                                src="/logo/whatsapp1.jpg"
                                alt="sample1"
                                className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                            />
                            <img
                                src="/logo/whatsapp2.jpg"
                                alt="sample2"
                                className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                            />
                            <img
                                src="/logo/whatsapp4.jpg"
                                alt="sample3"
                                className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                            />
                            <img
                                src="/logo/090b9ce4-2a30-4fae-83d2-4e9f43748.jpg"
                                alt="sample4"
                                className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                    </div>

                    {/* Quick Links / Contact */}
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-3 text-gray-800 border-b border-b-[#f85606] pb-2">
                            🏠 আমাদের ঠিকানা
                        </h4>
                        <div className="flex items-center gap-3 text-gray-600">
                            <MapPin className="w-4 h-4 text-[#f85606]" />
                            <span className="text-sm">নতুন বাজার, কাশিমাড়ী - শ্যামনগর,সাতক্ষীরা</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Phone className="w-4 h-4 text-[#f85606]" />
                            <a href="tel:+880138194740" className="text-sm hover:text-[#f85606] transition">
                                +880 138194740
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Mail className="w-4 h-4 text-[#f85606]" />
                            <a href="mailto:mostafizurrahman404434@gmail.com" className="text-sm hover:text-[#f85606] transition">
                                mostafizurrahman404434@gmail.com
                            </a>
                        </div>

                        {/* Socials */}
                        <div className="flex gap-3 mt-3">
                            <a href="https://www.facebook.com/abdullahonlineshoppingbd" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-green-100 dark:hover:bg-green-700 transition">
                                <Facebook className="w-5 h-5 text-blue-600" />
                            </a>
                            <a href="https://wa.link/boep4i" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-green-100 dark:hover:bg-green-700 transition">
                                <FaWhatsapp className="w-5 h-5 text-sky-500" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-green-100 dark:hover:bg-green-700 transition">
                                <Instagram className="w-5 h-5 text-pink-500" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="mt-10 pt-6 border-t border-t-[#f85606] flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} Nahid Hasan. সর্বস্বত্ব সংরক্ষিত।
                    </p>
                    <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-600 hidden sm:inline">
                            পেমেন্ট মেথড:
                        </p>
                        <p className="bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-500">
                            CASH ON DELIVERY
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
