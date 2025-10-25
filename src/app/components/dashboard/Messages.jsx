'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Eye } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AllMessage() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/messages", { method: "GET" });
            const data = await res.json();
            if (data.success) setMessages(data.message);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/messages`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            const data = await res.json();
            if (data.success) {
                toast.success("বার্তা মুছে ফেলা হয়েছে!", { position: "bottom-right" });
                fetchMessages();
            } else {
                toast.error(data.message, { position: "bottom-right" });
            }
        } catch (error) {
            console.error(error);
            toast.error("সার্ভার এরর", { position: "bottom-right" });
        }
    };

    return (
        <div>

            {/* সব বার্তা কার্ড আকারে */}
            <div className="grid grid-cols-1 sm:p-0 p-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {messages?.length > 0 ? (
                    messages.map((msg) => (
                        <motion.div
                            key={msg._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                        >
                            <h3 className="font-semibold text-[#f85606]">
                                {msg.name}
                            </h3>
                            <p className="text-gray-600  text-sm">📞 {msg.phone}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(msg.createdAt).toLocaleString("bn-BD")}
                            </p>

                            <div className="flex justify-between items-center mt-3">
                                <button
                                    onClick={() => setSelectedMessage(msg)}
                                    className="flex items-center gap-1 text-[#f85606] hover:text-[#6b2400]"
                                >
                                    <Eye className="w-4 h-4" /> বিস্তারিত
                                </button>
                                <button
                                    onClick={() => handleDelete(msg._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-3">কোনো বার্তা নেই</p>
                )}
            </div>

            {/* নির্বাচিত মেসেজ মডাল */}
            {selectedMessage && (
                <div className="fixed inset-0 sm:p-0 p-2 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl max-w-lg w-full relative">
                        <h3 className="text-lg font-bold text-[#f85606] ">
                            {selectedMessage.name}
                        </h3>
                        <p className="text-gray-600 ">📞 {selectedMessage.phone}</p>
                        <p className="text-sm mt-4 text-gray-700 ">
                            {selectedMessage.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(selectedMessage.createdAt).toLocaleString("bn-BD")}
                        </p>

                        <button
                            onClick={() => setSelectedMessage(null)}
                            className="mt-4 px-4 py-2 bg-[#f85606] hover:bg-[#842c00] text-white rounded-lg"
                        >
                            বন্ধ করুন
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
