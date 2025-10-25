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
        colorFrom: 'from-green-400',
        colorTo: 'to-blue-500',
    },
    {
        id: 'cod',
        title: 'ক্যাশ অন ডেলিভারি',
        desc: 'আপনি পন্য পৌঁছালে টাকা দিন — নিরাপদ ও সহজ পেমেন্ট বিকল্প।',
        icon: CreditCard,
        colorFrom: 'from-yellow-400',
        colorTo: 'to-orange-500',
    },
    {
        id: 'refund',
        title: 'মানি-ব্যাক গ্যারান্টি',
        desc: 'পন্যে সমস্যা হলে সহজ রিফান্ড বা পরিবর্তন নীতিমালা — গ্রাহক সন্তুষ্টি আমাদের অগ্রাধিকার।',
        icon: RefreshCw,
        colorFrom: 'from-pink-400',
        colorTo: 'to-red-500',
    },
    {
        id: 'support',
        title: 'অনলাইন সাপোর্ট ২৪/৭',
        desc: 'অর্ডার, রিটার্ন বা যেকোনো প্রশ্নে আমাদের লাইভ চ্যাট/মেসেজ সাপোর্ট সবসময় আছে।',
        icon: Headphones,
        colorFrom: 'from-indigo-400',
        colorTo: 'to-violet-500',
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
    hover: { scale: 1.03, y: -6, transition: { duration: 0.2 } },
}

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-0">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="sm:text-3xl text-2xl  md:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
                        আমাদের সেবা — দ্রুত, নিরাপদ ও বিশ্বাসযোগ্য
                    </h1>
                    <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        নিচের সুবিধাগুলো আপনার কেনাকাটাকে সহজ, নিরাপদ ও তাড়াতাড়ি করে তোলে। যদি কোনো প্রশ্ন থাকে — সরাসরি Support এ জেনোর করুন।
                    </p>
                </header>

                {/* Feature cards */}
                <motion.section
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    aria-label="ফিচার সমূহ"
                >
                    {features.map((f) => {
                        const Icon = f.icon
                        return (
                            <motion.article
                                key={f.id}
                                variants={cardVariant}
                                whileHover="hover"
                                className="relative rounded-2xl bg-white dark:bg-gray-800 shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                                role="region"
                                aria-labelledby={`feature-${f.id}`}
                            >
                                {/* accent bar */}
                                <div
                                    className={`absolute -top-6 left-6 w-16 h-16 rounded-full blur-lg opacity-40 ${f.colorFrom} ${f.colorTo} bg-gradient-to-br`}
                                    style={{ filter: 'blur(22px)' }}
                                    aria-hidden="true"
                                />
                                <div className="p-6 pt-10">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`flex-shrink-0 rounded-lg p-3 bg-gradient-to-br ${f.colorFrom} ${f.colorTo} text-white shadow-lg`}
                                            aria-hidden="true"
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 id={`feature-${f.id}`} className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                                {f.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{f.desc}</p>
                                        </div>
                                    </div>

                                    {/* details row */}
                                    <div className="mt-6 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 font-medium">
                                                বিশ্বস্ত
                                            </span>
                                            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 font-medium">
                                                নিরাপদ
                                            </span>
                                        </div>
                                    </div>

                                    {/* subtle footer note */}
                                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">নোট:</span> নির্দিষ্ট শর্ত ও নীতিমালা প্রযোজ্য।
                                    </div>
                                </div>

                                {/* hover shine */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 dark:from-white/0 dark:via-white/6 dark:to-white/0 opacity-0"
                                    aria-hidden="true"
                                />
                            </motion.article>
                        )
                    })}
                </motion.section>

                {/* CTA */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">সবাই আমাদের সেবার উপর ভরসা করে</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">আপনি চাইলে আজই অর্ডার করুন — আমরা দ্রুত পৌঁছে দেব।</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/components/products" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow">অর্ডার করুন</Link>
                        <Link href="/components/contact" className="px-4 py-2 bg-transparent border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">যোগাযোগ</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
