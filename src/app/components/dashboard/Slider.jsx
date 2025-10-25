"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ImagePlus } from "lucide-react";

export default function SlidesDashboard() {
    const [slides, setSlides] = useState([]);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        const res = await fetch("/api/slider");
        const data = await res.json();
        setSlides(data.slides);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (slides.length >= 6) {
            toast.error("❌ সর্বোচ্চ ৬টা স্লাইড দেওয়া যাবে!", { position: "bottom-right" });
            return;
        }

        if (!image || !text.trim()) {
            toast.warning("⚠️ ছবি ও টেক্সট দুটোই দিতে হবে!", { position: "bottom-right" });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);
        formData.append("text", text);

        try {
            const res = await fetch("/api/slider", { method: "POST", body: formData });
            const data = await res.json();

            if (data.success) {
                toast.success("✅ Slide সফলভাবে যোগ হয়েছে!", { position: "bottom-right" });
                setImage(null);
                setPreview(null);
                setText("");
                fetchSlides();
            } else {
                toast.error(data.message || "❌ কিছু ভুল হয়েছে!", { position: "bottom-right" });
            }
        } catch {
            toast.error("⚠️ সার্ভার এরর!", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("🗑️ সত্যিই ডিলিট করতে চাও?")) return;
        try {
            const res = await fetch("/api/slider", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("🗑️ Slide ডিলিট হয়েছে!", { position: "bottom-right" });
                fetchSlides();
            } else {
                toast.error("❌ ডিলিট ব্যর্থ!", { position: "bottom-right" });
            }
        } catch {
            toast.error("⚠️ সার্ভার এরর!", { position: "bottom-right" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 sm:p-8 border border-gray-100"
        >
            <h3 className="text-center text-2xl font-bold mb-6 text-[#f85606] flex items-center justify-center gap-2">
                🎞️ স্লাইড ম্যানেজ করুন
            </h3>

            {/* Upload Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        ✍️ স্লাইড টেক্সট লিখুন
                    </label>
                    <input
                        type="text"
                        placeholder="যেমন: আজকের বিশেষ অফার 🔥"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full border border-gray-300 focus:border-[#f85606] focus:ring-1 focus:ring-[#f85606] outline-none p-2.5 rounded-lg transition text-gray-700"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg w-48 h-32 cursor-pointer hover:border-[#f85606] transition">
                        {preview ? (
                            <img src={preview} alt="preview" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-400">
                                <ImagePlus className="w-8 h-8 mb-1" />
                                <span className="text-sm">ছবি নির্বাচন করুন</span>
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>

                    <div className="flex-1">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2.5 rounded-lg text-white font-semibold transition ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#f85606] hover:bg-[#702500]"
                                }`}
                        >
                            {loading ? "⏳ আপলোড হচ্ছে..." : "➕ Slide যোগ করুন"}
                        </button>
                    </div>
                </div>
            </form>

            {/* Slides Preview */}
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                    {slides.map((slide) => (
                        <motion.div
                            key={slide._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="border rounded-xl overflow-hidden bg-gray-50 shadow-sm hover:shadow-md transition relative group"
                        >
                            <img
                                src={slide.imageUrl}
                                alt="slide"
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3">
                                <p className="text-sm font-semibold text-gray-700 text-center">{slide.text}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(slide._id)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            <ToastContainer position="bottom-right" />
        </motion.div>
    );
}
