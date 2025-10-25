'use client';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { motion } from "framer-motion";

export function AddNotice() {
    const [notice, setNotice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!notice.trim()) {
            toast.error("⚠️ নোটিশ লিখুন আগে!", { position: "bottom-right" });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/notices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notice }),
            });
            const result = await res.json();

            if (result.success) {
                toast.success("✅ " + result.message, { position: "bottom-right" });
                setNotice('');
            } else {
                toast.error(result.message || "❌ কিছু ভুল হয়েছে!", { position: "bottom-right" });
            }
        } catch (error) {
            toast.error("⚠️ সার্ভার এরর!", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 sm:p-8 border border-gray-100"
        >
            <h3 className="text-center text-2xl font-bold mb-6 text-[#f85606]">
                📢 নতুন নোটিশ যোগ করুন
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        ✍️ নোটিশ লিখুন
                    </label>
                    <input
                        type="text"
                        placeholder="এখানে নোটিশ লিখুন..."
                        value={notice}
                        onChange={(e) => setNotice(e.target.value)}
                        className="w-full border border-gray-300 focus:border-[#f85606] focus:ring-1 focus:ring-[#f85606] outline-none p-2.5 rounded-lg transition text-gray-700"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2.5 rounded-lg text-white font-semibold transition ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#f85606] hover:bg-[#702500]"
                        }`}
                >
                    {loading ? "⏳ লোড হচ্ছে..." : "📢 প্রকাশ করুন"}
                </button>
            </form>

            <ToastContainer />
        </motion.div>
    );
}
