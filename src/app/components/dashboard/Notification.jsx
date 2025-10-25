'use client'
import React, { useEffect, useState } from 'react'
import { Bell, Trash2 } from "lucide-react";

const Notifications = ({ active }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([]); // ✅ এখানে '' না, []

    const fetchNotification = async () => {
        try {
            const res = await fetch('/api/notification', { method: 'GET' });
            const data = await res.json();
            if (data.success) setNotifications(data.message || []); // ✅ fallback array
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotification();
    }, [active]);

    const handleDelete = async (id) => {
        try {
            const res = await fetch('/api/notification', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await res.json();
            if (data.success) fetchNotification();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRead = async () => {
        try {
            await fetch('/api/notification', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            fetchNotification(); // ✅ পড়া হলে আবার লোড হবে
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative">
            <button
                title="Notifications"
                className={`p-3 rounded-full relative hover:bg-[#7c2900] text-[#f85606] hover:text-white ${showNotification && 'bg-[#7c2900] text-white'}`}
                onClick={() => {
                    setShowNotification(!showNotification);
                    handleRead();
                }}
            >
                {notifications.filter(elem => elem.isRead === false)?.length > 0 && (
                    <span className="bg-red-600 text-white size-5 flex items-center justify-center rounded-full absolute -top-1 -right-1 text-xs">
                        {notifications.filter(elem => !elem.isRead).length}
                    </span>
                )}
                <Bell className="w-5 h-5" />
            </button>

            {/* 🔔 Notification Dropdown */}
            {showNotification && (
                <div className="w-64 border border-[#f85606] rounded-md overflow-y-auto max-h-72 bg-white absolute right-0 mt-2 shadow-lg">
                    {notifications.length === 0 ? (
                        <p className="text-center text[#f85606] py-4">কোনো নোটিফিকেশন নেই</p>
                    ) : (
                        notifications.slice().reverse().map((n) => (
                            <div
                                key={n._id}
                                className={`flex justify-between items-center px-4 py-2 border-b border-b-[#f85606] last:border-b-0 
                                    ${n.isRead ? "bg-white" : "bg-green-50"}`}
                            >
                                <div>
                                    <p className={`text-sm ${n.isRead ? "text-[#f85606]" : "text-green-700 font-semibold"}`}>
                                        {n.title}
                                    </p>
                                    <p className="text-xs text-[#f85606]">
                                        {new Date(n.createdAt).toLocaleString("bn-BD")}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(n._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Notifications;
