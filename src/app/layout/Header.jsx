'use client'
import React, { useState } from 'react';
import { Menu, X, Home, ShoppingBag, Info, Phone, Heart, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathName = usePathname();

    const links = [
        { name: 'Home', href: '/', icon: <Home className="w-4 h-4 mr-2" /> },
        { name: 'Products', href: '/components/products', icon: <ShoppingBag className="w-4 h-4 mr-2" /> },
        { name: 'About Us', href: '/components/about', icon: <Info className="w-4 h-4 mr-2" /> },
        { name: 'Contact', href: '/components/contact', icon: <Phone className="w-4 h-4 mr-2" /> },
        { name: 'Wishlist', href: '/components/whitelist', icon: <Heart className="w-4 h-4 mr-2" /> },
        { name: 'Dashboard', href: '/components/dashboard', icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
    ];

    return (
        <header className="w-full text-white bg-[#f85606] shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-3 md:px-12 lg:px-16 flex justify-between items-center h-12 sm:h-16">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img
                        src="/my-logo.png"
                        alt="Logo"
                        className="sm:h-14 h-10 -mt-0.5 object-contain"
                    />
                    <div className="flex flex-col justify-center">
                        <p className='logo-font text-[15px] font-bold sm:text-2xl tracking-wide'>
                            MUNTAHA MULTI TRADE
                        </p>
                    </div>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="flex items-center text-[15px] relative group font-medium transition"
                        >
                            <span className='mb-1'>{link.icon}</span>
                            {link.name}
                            <span
                                className={`absolute left-0 ${pathName === link.href ? "w-full" : "w-0"} 
                                -bottom-1 h-0.5 bg-white transition-all group-hover:w-full`}
                            ></span>
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden mt-2">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-200"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu with Animation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-white shadow-md"
                    >
                        <nav className="flex flex-col gap-4 p-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center text-[#f85606] hover:text-[#832c00] font-medium transition"
                                >
                                    <span className='mb-1'>{link.icon}</span>
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
