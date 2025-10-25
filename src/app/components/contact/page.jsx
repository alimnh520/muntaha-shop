'use client'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success) {
                toast.success(data.message, { position: "bottom-right" });
                setFormData({ name: "", phone: "", message: "" });
            } else {
                toast.error(data.message, { position: "bottom-right" });
            }
        } catch (error) {
            console.log(error);
            toast.error("সার্ভার এরর", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 text-[#f85606]">
            <h1 className="sm:text-3xl text-xl font-bold text-[#f85606] mb-5 text-center">আমাদের সাথে যোগাযোগ</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* যোগাযোগ তথ্য */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-lg shadow-md p-6 space-y-4"
                >
                    <h2 className="text-xl font-semibold text-[#f85606] border-b pb-2">যোগাযোগের ঠিকানা</h2>

                    <div className="flex items-center gap-3">
                        <Phone className="text-green-500 w-5 h-5" />
                        <p className="text-gray-700">+880 1566-099299, +880 1813-623629</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Mail className="text-green-500 w-5 h-5" />
                        <p className="text-gray-700">khandokarabdullahbd@gmail.com</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <MapPin className="text-green-500 w-5 h-5" />
                        <p className="text-gray-700">৩৩,লবনচরা বান্দাবাজার,শিপইয়ার্ডরোড, খুলনা</p>
                    </div>

                    <h3 className="text-lg font-semibold text-[#f85606] mt-6">🌐 সোশ্যাল মিডিয়া</h3>
                    <div className="flex gap-4 mt-2">
                        <a href="https://www.facebook.com/abdullahonlineshoppingbd" className="text-blue-600 hover:text-blue-800"><Facebook /></a>
                        <a href="https://wa.link/eefh9h" className="text-sky-500 hover:text-sky-700 text-2xl"><FaWhatsapp/></a>
                        <a href="#" className="text-pink-500 hover:text-pink-700"><Instagram /></a>
                    </div>
                </motion.div>

                {/* ম্যাপ */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-lg overflow-hidden shadow-md"
                >
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99734.21194385654!2d89.4498626019533!3d22.84550795405857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9071cb47152f%3A0xf04b212290718952!2sKhulna!5e1!3m2!1sen!2sbd!4v1758034351365!5m2!1sen!2sbd" width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </motion.div>
            </div>

            {/* কন্টাক্ট ফর্ম */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow-md p-6 mt-12"
            >
                <div className="max-w-3xl mx-auto py-10">
                    <h2 className="text-2xl font-bold text-center mb-6">✉️ বার্তা পাঠান</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="আপনার নাম"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border outline-[#f85606] rounded px-3 py-2"
                        />
                        <input
                            type="number"
                            name="phone"
                            placeholder="আপনার মোবাইল"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border outline-[#f85606] rounded px-3 py-2"
                        />
                        <textarea
                            rows="4"
                            name="message"
                            placeholder="আপনার বার্তা..."
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border outline-[#f85606] rounded px-3 py-2"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#f85606] hover:bg-[#953200] text-white rounded-lg"
                        >
                            {loading ? "লোড হচ্ছে..." : "পাঠান"}
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </motion.div>
        </div>
    );
}
