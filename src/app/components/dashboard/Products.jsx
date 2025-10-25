'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [deliveryCharge, setDeliveryCharge] = useState(''); // নতুন স্টেট
    const [loading, setLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { value: 'all', label: 'সব ক্যাটাগরি' },
        { value: 'organic_food', label: '🍅 অর্গানিক ফুড' },
        { value: 'gazette', label: '📰 গেজেট' },
        { value: 'medical_equipments', label: '💉 মেডিকেল ইকুইপমেন্টস' },
        { value: 'fashion', label: '👗 ফ্যাশন' },
        { value: 'electronics', label: '💻 ইলেকট্রনিক্স' },
        { value: 'sourcing_service', label: '🚚 সোর্সিং সার্ভিস' },
        { value: 'decorate', label: '🏠 ডেকোরেট' },
        { value: 'home_and_healthy', label: '💪 হেলথি হোম' },
        { value: 'mother_and_baby', label: '👶 মা ও শিশু' },
        { value: 'life_style', label: '✨ লাইফস্টাইল' },
        { value: 'others', label: '🔹 অন্যান্য' },
    ];

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products', { method: 'GET' });
                const data = await res.json();
                if (data.success) setProducts(data.message);
            } catch (err) {
                console.error('Products fetch error:', err);
            }
        }
        fetchProducts();
    }, []);

    const startEditing = (product) => {
        setEditingProductId(product._id);
        setPrice(product.price);
        setDiscount(product.discount ?? 0);
        setDeliveryCharge(product.deliveryCharge ?? 0); // ডেলিভারি চার্জ প্র-fill
        setNewImages([]);
    };

    const cancelEditing = () => {
        setEditingProductId(null);
        setPrice('');
        setDiscount('');
        setDeliveryCharge('');
        setNewImages([]);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + newImages.length > 5) {
            toast.error('⚠️ সর্বোচ্চ ৫টা ছবি দেওয়া যাবে!');
            return;
        }

        const valid = files.filter((file) => {
            if (file.size > 3 * 1024 * 1024) {
                toast.error(`${file.name} এর সাইজ 3MB এর বেশি!`);
                return false;
            }
            return true;
        });

        setNewImages((prev) => [...prev, ...valid]);
    };

    const removeNewImage = (index) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const saveChanges = async (id) => {
        if (!price) {
            toast.error('দয়া করে দাম ঠিকভাবে দিন!');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('price', Number(price));
            formData.append('discount', Number(discount) || 0);
            formData.append('id', id);
            formData.append('deliveryCharge', Number(deliveryCharge) || 0); // নতুন

            if (newImages.length > 0) {
                newImages.forEach((img) => formData.append('newImages', img));
            }

            const res = await fetch(`/api/products`, {
                method: 'PATCH',
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                toast.success('✅ পণ্য আপডেট হয়েছে!');
                setProducts((prev) =>
                    prev.map((p) =>
                        p._id === id
                            ? {
                                ...p,
                                price: Number(price),
                                discount: Number(discount) || 0,
                                deliveryCharge: Number(deliveryCharge) || 0,
                                product_image: data.updatedImages || p.product_image,
                            }
                            : p
                    )
                );
                cancelEditing();
            } else {
                toast.error(data.message || 'কিছু ভুল হয়েছে!');
            }
        } catch (err) {
            console.error(err);
            toast.error('⚠️ সার্ভার এরর');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('আপনি কি নিশ্চিত ডিলেট করতে চান?')) return;
        setIsDelete(true);
        try {
            const res = await fetch(`/api/products`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success('🗑️ পণ্য ডিলেট হয়েছে!');
                setProducts(products.filter((p) => p._id !== id));
                cancelEditing();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error('⚠️ সার্ভার এরর');
        } finally {
            setIsDelete(false);
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchSearch = product.product_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchCategory =
            selectedCategory === 'all' || product.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    return (
        <div className="max-w-7xl mx-auto py-3 px-4">
            <h1 className="sm:text-3xl text-xl font-bold text-[#f85606] mb-3 text-center">
                সকল পণ্য
            </h1>

            <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-3">
                <input
                    type="text"
                    placeholder="🔍 পণ্যের নাম দিয়ে খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-1/2 border border-[#f85606] text-[#f85606] rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#f85606]"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-1/4 border border-[#f85606] text-[#f85606] rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#f85606]"
                >
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                <AnimatePresence>
                    {filteredProducts
                        ?.slice()
                        .reverse()
                        .map((product) => {
                            const discountedPrice =
                                product.discount && product.discount > 0
                                    ? Math.round(product.price - (product.price * product.discount) / 100)
                                    : null;

                            return (
                                <motion.div
                                    key={product._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden relative hover:shadow-xl transition"
                                >
                                    <div className="relative overflow-hidden h-36 sm:h-44 flex justify-center items-center">
                                        {product.discount > 0 && (
                                            <div className="absolute top-2 right-2 z-20 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                                -{product.discount}%
                                            </div>
                                        )}
                                        <Link href={`/components/products/${product._id}`}>
                                            <img
                                                src={product.product_image[0]}
                                                alt={product.product_name}
                                                className="w-full object-cover transition-transform duration-500 transform hover:scale-110"
                                            />
                                        </Link>
                                    </div>

                                    <div className="p-3">
                                        <h4 className="line-clamp-2 leading-5 font-semibold text-gray-800 mb-1">
                                            {product.product_name}
                                        </h4>

                                        {editingProductId === product._id ? (
                                            <>
                                                <label className="block text-xs text-gray-500">💰 দাম:</label>
                                                <input
                                                    type="number"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="border p-1 border-[#f85606] outline-[#f85606] rounded w-full mb-2 text-sm"
                                                />

                                                <label className="block text-xs text-gray-500">🎉 ডিসকাউন্ট (%):</label>
                                                <input
                                                    type="number"
                                                    value={discount}
                                                    onChange={(e) => setDiscount(e.target.value)}
                                                    className="border p-1 border-[#f85606] outline-[#f85606] rounded w-full mb-2 text-sm"
                                                />

                                                <label className="block text-xs text-gray-500">🚚 ডেলিভারি চার্জ:</label>
                                                <input
                                                    type="number"
                                                    value={deliveryCharge}
                                                    onChange={(e) => setDeliveryCharge(e.target.value)}
                                                    className="border p-1 border-[#f85606] outline-[#f85606] rounded w-full mb-2 text-sm"
                                                />

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageChange}
                                                    className="border p-1 border-[#f85606] outline-[#f85606] rounded w-full text-xs mb-2"
                                                />

                                                {newImages.length > 0 && (
                                                    <div className="grid grid-cols-3 gap-2 mb-2">
                                                        {newImages.map((img, index) => (
                                                            <div key={index} className="relative">
                                                                <img
                                                                    src={URL.createObjectURL(img)}
                                                                    className="w-full h-16 object-cover rounded-lg border"
                                                                />
                                                                <button
                                                                    onClick={() => removeNewImage(index)}
                                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-[10px]"
                                                                >
                                                                    ✖
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {discountedPrice ? (
                                                    <div className="flex items-center gap-x-2">
                                                        <p className="text-[#f85606] text-lg font-bold">
                                                            ৳ {discountedPrice}
                                                        </p>
                                                        <p className="text-gray-400 line-through text-xs">
                                                            ৳ {product.price}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-[#f85606] font-bold text-lg">
                                                        ৳ {product.price}
                                                    </p>
                                                )}
                                                <p className="text-gray-500 text-xs mt-1">ডেলিভারি চার্জ: ৳ {product.deliveryCharge ?? 0}</p>
                                            </>
                                        )}

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {editingProductId === product._id ? (
                                                <>
                                                    <button
                                                        onClick={() => saveChanges(product._id)}
                                                        disabled={loading}
                                                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded w-full"
                                                    >
                                                        {loading ? 'লোড হচ্ছে...' : 'সেভ'}
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        className="bg-gray-400 hover:bg-gray-500 text-white text-xs px-2 py-1 rounded w-full"
                                                    >
                                                        বাতিল
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        disabled={loading}
                                                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded w-full"
                                                    >
                                                        {isDelete ? 'লোড হচ্ছে...' : 'ডিলেট'}
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => startEditing(product)}
                                                    className="bg-[#f85606] hover:bg-[#702500] text-white text-xs px-2 py-1 rounded w-full"
                                                >
                                                    ✏️ Edit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                </AnimatePresence>
            </div>

            <ToastContainer />
        </div>
    );
}
