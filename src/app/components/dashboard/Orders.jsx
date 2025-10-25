'use client'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    async function fetchOrders() {
        try {
            const res = await fetch('/api/order');
            const data = await res.json();
            if (data.success) setOrders(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateOrderStatus(orderId, status) {
        try {
            const res = await fetch(`/api/order`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, status })
            });

            const data = await res.json();
            if (data.success) {
                setOrders((prev) =>
                    prev.map((o) => (o._id === orderId ? { ...o, status } : o))
                );
                setSelectedOrder(null);
            }
        } catch (err) {
            console.error("Status update failed:", err);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-8">
            <h1 className="sm:text-4xl text-2xl font-extrabold text-center text-[#f85606] mb-10 tracking-wide">
                অর্ডার ম্যানেজমেন্ট ড্যাশবোর্ড
            </h1>

            {orders.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-[#933100] shadow-lg">
                    <table className="w-full border-collapse bg-white text-gray-700">
                        <thead className="bg-[#933100] text-white">
                            <tr>
                                <th className="p-3 text-left">#</th>
                                <th className="p-3 text-left">ছবি</th>
                                <th className="p-3 text-left">পণ্য</th>
                                <th className="p-3 text-left">ক্রেতা</th>
                                <th className="p-3 text-left">পরিমাণ</th>
                                <th className="p-3 text-left">মূল্য</th>
                                <th className="p-3 text-left">তারিখ</th>
                                <th className="p-3 text-center">স্ট্যাটাস</th>
                                <th className="p-3 text-center">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice().reverse().map((order, index) => (
                                <motion.tr
                                    key={order._id}
                                    className="border-b border-b-[#933100] hover:bg-green-50 transition"
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">
                                        <Link href={`/components/products/${order.productId}`}>
                                            <img
                                                src={order.productImage}
                                                alt={order.productName}
                                                className="h-12 w-12 rounded-lg object-cover border border-[#933100]"
                                            />
                                        </Link>
                                    </td>
                                    <td className="p-3 font-semibold">{order.productName}</td>
                                    <td className="p-3 text-sm">
                                        <p className="font-medium">{order.name}</p>
                                        <p className="text-xs text-gray-500">{order.mobile}</p>
                                    </td>
                                    <td className="p-3 text-[#933100] font-bold w-20">
                                        {order.quantity} pcs
                                    </td>
                                    <td className="p-3 text-[#933100] font-bold w-20">
                                        ৳ {order.totalPrice}
                                    </td>
                                    <td className="p-3 text-sm text-gray-500">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "confirmed"
                                                ? "bg-green-100 text-[#f85606]"
                                                : order.status === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {order.status || "pending"}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="text-sm bg-green-500 hover:bg-[#933100] text-white px-3 py-1.5 rounded-lg transition"
                                        >
                                            বিস্তারিত
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg py-20">
                    কোনো অর্ডার নেই
                </p>
            )}

            {/* 🧾 অর্ডার বিস্তারিত Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 overflow-auto py-10 flex items-start justify-center z-50 px-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative print:shadow-none"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                        >
                            {/* ❌ Close */}
                            <button
                                className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl no-print"
                                onClick={() => setSelectedOrder(null)}
                            >
                                ✖
                            </button>

                            {/* 🏬 Header */}
                            <div className="text-center border-b border-b-[#933100] pb-3 mb-6">
                                <h2 className="text-2xl font-bold text-[#f85606]"> অর্ডার ইনভয়েস</h2>
                                <p className="text-sm text-gray-500">Order ID: {selectedOrder._id}</p>
                            </div>

                            {/* 🛍️ Product Info */}
                            <div className="flex items-center justify-start gap-x-5 mb-6">
                                <div className="flex flex-col">
                                    <img
                                        src={selectedOrder.productImage}
                                        alt={selectedOrder.productName}
                                        className="w-40 h-40 object-cover rounded-xl shadow-md mb-4"
                                    />
                                    <h2 className="text-xl font-bold line-clamp-2 leading-5 text-[#933100]">{selectedOrder.productName}</h2>
                                </div>

                                {/* 💰 Price Breakdown */}
                                <div className=" bg-orange-50 rounded-lg shadow-sm p-4 w-full max-w-md">
                                    <h3 className="text-lg font-semibold text-[#f85606] mb-2 text-center"> পেমেন্ট বিবরণ</h3>
                                    <div className="space-y-1 text-gray-800 text-sm">
                                        <p> একক পণ্যের দাম: <span className="font-semibold text-[#933100]">৳ {selectedOrder.price}</span></p>
                                        <p> পরিমাণ: <span className="font-semibold">{selectedOrder.quantity} টি</span></p>
                                        <p> মোট (পণ্য): <span className="font-semibold">৳ {selectedOrder.price * selectedOrder.quantity}</span></p>
                                        <p> ডেলিভারি চার্জ: <span className="font-semibold text-blue-600">৳ {selectedOrder.deliveryCharge}</span></p>
                                        <hr className="my-1 border-gray-300" />
                                        <p className="text-lg font-bold text-[#f85606]">
                                            সর্বমোট: ৳ {(selectedOrder.price * selectedOrder.quantity) + (selectedOrder.deliveryCharge)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 📋 Buyer Info Table */}
                            <div className="border rounded-lg overflow-hidden shadow-sm mt-6">
                                <table className="w-full text-sm border-collapse">
                                    <tbody>
                                        <tr className="bg-green-100 text-gray-800 font-semibold">
                                            <td className="border px-3 py-2 w-1/3">ক্রেতার তথ্য</td>
                                            <td className="border px-3 py-2">বিস্তারিত</td>
                                        </tr>
                                        {[
                                            [" নাম", selectedOrder.name],
                                            [" মোবাইল", selectedOrder.mobile],
                                            [" বিভাগ", selectedOrder.division],
                                            [" জেলা", selectedOrder.district],
                                            [" উপজেলা", selectedOrder.upazilla],
                                            [" ঠিকানা", selectedOrder.address],
                                            [" পেমেন্ট পদ্ধতি", selectedOrder.paymentMethod],
                                            [" তারিখ", new Date(selectedOrder.date).toLocaleString()]
                                        ].map(([label, value]) => (
                                            <tr key={label}>
                                                <td className="border px-3 py-2 font-medium">{label}</td>
                                                <td className="border px-3 py-2">{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* ✅ Status or Buttons */}
                            {!["confirmed", "rejected"].includes(selectedOrder.status) ? (
                                <div className="mt-6 flex gap-4 no-print">
                                    <button
                                        className="flex-1 bg-[#933100] hover:bg-[#f85606] text-white py-2 rounded-lg font-semibold"
                                        onClick={() => updateOrderStatus(selectedOrder._id, "confirmed")}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
                                        onClick={() => updateOrderStatus(selectedOrder._id, "rejected")}
                                    >
                                        Reject
                                    </button>
                                </div>
                            ) : (
                                <p className="mt-6 text-center font-semibold text-lg">
                                    {selectedOrder.status === "confirmed" ? (
                                        <span className="text-[#933100]"> অর্ডার কনফার্ম হয়েছে</span>
                                    ) : (
                                        <span className="text-red-600"> অর্ডার বাতিল হয়েছে</span>
                                    )}
                                </p>
                            )}

                            {/* 🖨️ Print Button */}
                            <div className="mt-6 flex justify-center no-print">
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                                    onClick={() => window.print()}
                                >
                                    প্রিন্ট করুন
                                </button>
                            </div>

                            {/* 🏬 Shop Info */}
                            <div className="mt-8 border-t pt-4 text-center text-sm text-gray-600 space-y-1">
                                <p> আমাদের ঠিকানা:</p>
                                <p>নতুন বাজার, কাশিমাড়ী - শ্যামনগর,সাতক্ষীরা</p>
                                <p>📞 +880 138194740</p>
                                <p>📧 mostafizurrahman404434@gmail.com</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
