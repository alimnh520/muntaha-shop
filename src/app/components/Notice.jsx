'use client'
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function NoticeHeadline() {
    const [notice, setNotice] = useState('');
    const controls = useAnimation();

    useEffect(() => {
        async function getNotice() {
            const res = await fetch('/api/notices', { method: 'GET' });
            const data = await res.json();
            setNotice(data.message);
        }
        getNotice();

        controls.start({ x: "-100%", transition: { repeat: Infinity, duration: 20, ease: "linear" } });
    }, [controls]);

    return (
        <div className="bg-[#f85606] py-0 overflow-hidden relative">
            <motion.div
                initial={{ x: "100%" }}
                animate={controls}
                onMouseEnter={() => controls.stop()}
                onMouseLeave={() => controls.start({ x: "-100%", transition: { repeat: Infinity, duration: 20, ease: "linear" } })}
                className="whitespace-nowrap text-white text-xl font-semibold"
            >
                {notice ? notice.text : (
                    <div className="flex h-7 items-center justify-center space-x-2">
                        <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                        <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}