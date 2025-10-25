'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCart } from 'lucide-react';

export default function OrderPage() {
    const router = useRouter();
    const { id } = useParams();
    const productId = id;

    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const [divisionList, setDivisionList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [upazillaList, setUpazillaList] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazilla, setSelectedUpazilla] = useState('');

    // 🛒 Fetch product
    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products/${productId}`);
                const data = await res.json();
                if (data.success) setProduct(data.product);
            } catch (err) {
                console.error("Product fetch error:", err);
            }
        }
        fetchProduct();
    }, [productId]);

    // 🌍 Fetch location lists
    useEffect(() => {
        async function fetchData() {
            try {
                const [divRes, disRes, upzRes] = await Promise.all([
                    fetch(process.env.NEXT_PUBLIC_DIVISION),
                    fetch(process.env.NEXT_PUBLIC_DISTRICT),
                    fetch(process.env.NEXT_PUBLIC_UPAZILLA),
                ]);
                const divData = await divRes.json();
                const disData = await disRes.json();
                const upzData = await upzRes.json();

                setDivisionList(Array.isArray(divData) ? divData : divData.data || []);
                setDistrictList(Array.isArray(disData) ? disData : disData.data || []);
                setUpazillaList(Array.isArray(upzData) ? upzData : upzData.data || []);
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        }
        fetchData();
    }, []);

    // ➕➖ Quantity handler
    const handleQuantity = (type) => {
        if (!product) return;
        if (type === 'inc') setQuantity(q => q + 1);
        if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    };

    // 💸 Discounted price
    const discountedPrice = product?.discount && product.discount > 0
        ? Math.round(product.price - (product.price * product.discount) / 100)
        : product?.price || 0;

    // 🚚 Delivery charge (from product or default 0)
    const DELIVERY_CHARGE = product?.deliveryCharge ? Number(product.deliveryCharge) : 0;

    // 🧮 Total price
    const totalPrice = (discountedPrice * quantity) + DELIVERY_CHARGE;

    // ✅ Order Submit
    const handleOrder = async () => {
        if (!name || !mobile || !selectedDivision || !selectedDistrict || !selectedUpazilla || !address) {
            toast.error('সব তথ্য পূরণ করুন!', { position: "bottom-right" });
            return;
        }
        setLoading(true);

        const order = {
            productId: product._id,
            productName: product.product_name,
            productImage: product.product_image?.[0] || "",
            price: discountedPrice,
            quantity,
            deliveryCharge: DELIVERY_CHARGE,
            totalPrice,
            name,
            mobile,
            division: selectedDivision,
            district: selectedDistrict,
            upazilla: selectedUpazilla,
            address,
            paymentMethod: 'Cash on Delivery',
            date: new Date().toISOString()
        };

        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });
            const data = await res.json();

            if (data.success) {
                toast.success(data.message, { position: "bottom-right" });

                const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
                existingOrders.push(order);
                localStorage.setItem("orders", JSON.stringify(existingOrders));

                setTimeout(() => window.location.reload(), 1500);
            }
            else {
                toast.error(data.message || "কিছু ভুল হয়েছে!", { position: "bottom-right" });
            }
        } catch (err) {
            console.error("Backend error:", err);
            toast.error("সার্ভারে সমস্যা হয়েছে!", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    if (!product) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <motion.h1
                className="text-3xl font-bold text-[#f85606] mb-8 text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                অর্ডার ফর্ম
            </motion.h1>

            <motion.div
                className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {/* 🖼 Product Info */}
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={product.product_image?.[0]}
                        alt={product.product_name}
                        className="w-full md:w-1/3 h-64 object-cover rounded-xl shadow-md"
                    />
                    <div className="flex-1 space-y-3">
                        <h2 className="text-2xl font-semibold">{product.product_name}</h2>
                        <div className="flex items-center gap-3">
                            <p className="text-[#f85606] font-bold text-xl">৳ {discountedPrice}</p>
                            {product.discount > 0 && (
                                <p className="text-gray-400 line-through">৳ {product.price}</p>
                            )}
                        </div>

                        {/* 🧮 Quantity + Price */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                            <div className="flex items-center gap-3">
                                <button onClick={() => handleQuantity('dec')} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">-</button>
                                <span className="text-lg font-semibold">{quantity}</span>
                                <button onClick={() => handleQuantity('inc')} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">+</button>
                            </div>

                            <div className="ml-auto text-right">
                                <p>পণ্যের দাম: ৳ {discountedPrice * quantity}</p>
                                <p>ডেলিভারি চার্জ: ৳ {DELIVERY_CHARGE}</p>
                                <p className="font-bold text-[#f85606] text-lg">মোট: ৳ {totalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📋 Order Form */}
                <div className="space-y-4">
                    <input type="text" placeholder="নাম" className="w-full border px-4 text-[#f85606] py-3 rounded-lg outline-[#f85606]" value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="মোবাইল" className="w-full border px-4 text-[#f85606] py-3 rounded-lg outline-[#f85606]" value={mobile} onChange={e => setMobile(e.target.value)} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                            className="border px-4 py-3 border-[#f85606] text-[#f85606] rounded-lg outline-[#f85606]"
                            value={selectedDivision}
                            onChange={e => {
                                setSelectedDivision(e.target.value);
                                setSelectedDistrict('');
                                setSelectedUpazilla('');
                            }}
                        >
                            <option value="">বিভাগ নির্বাচন করুন</option>
                            {divisionList.map(d => (
                                <option key={d.ID} value={d.NAME}>{d.NAME}</option>
                            ))}
                        </select>

                        <select
                            className="border px-4 py-3 border-[#f85606] text-[#f85606] rounded-lg outline-[#f85606]"
                            value={selectedDistrict}
                            onChange={e => {
                                setSelectedDistrict(e.target.value);
                                setSelectedUpazilla('');
                            }}
                            disabled={!selectedDivision}
                        >
                            <option value="">জেলা নির্বাচন করুন</option>
                            {districtList
                                .filter(d => d.DIVISION_BBS_CODE.toString() === divisionList.find(div => div.NAME === selectedDivision)?.BBS_CODE?.toString())
                                .map(dis => (
                                    <option key={dis.ID} value={dis.NAME}>{dis.NAME}</option>
                                ))}
                        </select>

                        <select
                            className="border px-4 py-3 border-[#f85606] text-[#f85606] rounded-lg outline-[#f85606]"
                            value={selectedUpazilla}
                            onChange={e => setSelectedUpazilla(e.target.value)}
                            disabled={!selectedDistrict}
                        >
                            <option value="">উপজেলা নির্বাচন করুন</option>
                            {upazillaList
                                .filter(u => u.DISTRICT_BBS_CODE.toString() === districtList.find(dis => dis.NAME === selectedDistrict)?.BBS_CODE?.toString())
                                .map(upz => (
                                    <option key={upz.ID} value={upz.NAME}>{upz.NAME}</option>
                                ))}
                        </select>
                    </div>

                    <textarea placeholder="বিস্তারিত ঠিকানা" className="w-full border px-4 text-[#f85606] py-3 rounded-lg outline-[#f85606]" value={address} onChange={e => setAddress(e.target.value)} />
                </div>

                <p className='text-[#f85606] text-sm'>🚚 সারাদেশে ডেলিভারি চার্জ মাত্র {product?.deliveryCharge ? Number(product.deliveryCharge) : 0} টাকা </p>

                <motion.button
                    onClick={handleOrder}
                    className="w-full bg-gradient-to-r from-[#f85606] to-blue-500 hover:from-[#e14d00] hover:to-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={loading}
                >
                    <ShoppingCart className="w-5 h-5" /> {loading ? "লোড হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
                </motion.button>
            </motion.div>

            <ToastContainer />
        </div>
    );
}
