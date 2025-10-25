'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Truck, CreditCard, RefreshCw, Headphones } from 'lucide-react'
import Link from 'next/link'

const features = [
    {
        id: 'delivery',
        title: 'দ্রুত ও ফ্রি ডেলিভারি',
        desc: 'অর্ডার করলে দ্রুত এবং নিরাপদ ডেলিভারি — নির্দিষ্ট শর্তে ফ্রি ডেলিভারি।',
        icon: Truck,
        colorFrom: 'from-[#f85606]',
        colorTo: 'to-[#933100]',
    },
    {
        id: 'cod',
        title: 'ক্যাশ অন ডেলিভারি',
        desc: 'আপনি পন্য পৌঁছালে টাকা দিন — নিরাপদ ও সহজ পেমেন্ট বিকল্প।',
        icon: CreditCard,
        colorFrom: 'from-[#f85606]',
        colorTo: 'to-[#933100]',
    },
    {
        id: 'refund',
        title: 'মানি-ব্যাক গ্যারান্টি',
        desc: 'পন্যে সমস্যা হলে সহজ রিফান্ড বা পরিবর্তন নীতিমালা — গ্রাহক সন্তুষ্টি আমাদের অগ্রাধিকার।',
        icon: RefreshCw,
        colorFrom: 'from-[#f85606]',
        colorTo: 'to-[#933100]',
    },
    {
        id: 'support',
        title: 'অনলাইন সাপোর্ট ২৪/৭',
        desc: 'অর্ডার, রিটার্ন বা যেকোনো প্রশ্নে আমাদের লাইভ চ্যাট/মেসেজ সাপোর্ট সবসময় আছে।',
        icon: Headphones,
        colorFrom: 'from-[#f85606]',
        colorTo: 'to-[#933100]',
    },
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
}

const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
    hover: { scale: 1.05, y: -6, transition: { duration: 0.2 } },
}

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-0">
            <div className="sm:w-10/12 mx-auto">
                {/* Header */}
                <header className="text-center mb-12">
                    <motion.h1
                        className="sm:text-2xl text-xl md:text-3xl font-bold text-[#933100] mb-3 border-b border-[#f85606] pb-2"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        আমাদের সেবা — দ্রুত, নিরাপদ ও বিশ্বাসযোগ্য
                    </motion.h1>
                    <motion.p
                        className="mt-3 text-gray-700 max-w-2xl mx-auto text-base sm:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        নিচের সুবিধাগুলো আপনার কেনাকাটাকে সহজ, নিরাপদ ও তাড়াতাড়ি করে তোলে।
                        যদি কোনো প্রশ্ন থাকে — সরাসরি Support এ যোগাযোগ করুন।
                    </motion.p>
                </header>

                {/* Feature cards */}
                <motion.section
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    aria-label="ফিচার সমূহ"
                >
                    {features.map((f, index) => {
                        const Icon = f.icon
                        return (
                            <motion.article
                                key={f.id}
                                variants={cardVariant}
                                whileHover="hover"
                                className="relative rounded-xl bg-white shadow-md overflow-hidden border border-gray-100 cursor-pointer transition"
                            >
                                <div className={`absolute -top-6 left-6 w-16 h-16 rounded-full blur-lg opacity-40 ${f.colorFrom} ${f.colorTo} bg-gradient-to-br`} style={{ filter: 'blur(22px)' }} aria-hidden="true" />

                                <div className="p-6 pt-10">
                                    <div className="flex items-start gap-4">
                                        <div className={`flex-shrink-0 rounded-lg p-3 bg-gradient-to-br ${f.colorFrom} ${f.colorTo} text-white shadow-lg`} aria-hidden="true">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#933100]">{f.title}</h3>
                                            <p className="mt-2 text-gray-600 text-sm">{f.desc}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-3">
                                        <span className="inline-block px-3 py-1 rounded-full bg-[#f85606]/20 text-[#f85606] text-xs font-medium">বিশ্বস্ত</span>
                                        <span className="inline-block px-3 py-1 rounded-full bg-[#933100]/20 text-[#933100] text-xs font-medium">নিরাপদ</span>
                                    </div>

                                    <div className="mt-3 text-xs text-gray-500">
                                        <span className="font-semibold">নোট:</span> নির্দিষ্ট শর্ত ও নীতিমালা প্রযোজ্য।
                                    </div>
                                </div>
                            </motion.article>
                        )
                    })}
                </motion.section>

                {/* CTA */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div>
                        <h4 className="text-lg font-semibold text-[#933100]">সবাই আমাদের সেবার উপর ভরসা করে</h4>
                        <p className="text-sm text-gray-700 mt-1">আপনি চাইলে আজই অর্ডার করুন — আমরা দ্রুত পৌঁছে দেব।</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/components/products" className="px-4 py-2 bg-[#f85606] hover:bg-[#933100] text-white rounded-md font-medium shadow">অর্ডার করুন</Link>
                        <Link href="/components/contact" className="px-4 py-2 bg-transparent border border-[#933100] text-[#933100] rounded-md hover:bg-[#f85606] hover:text-white transition">যোগাযোগ</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
