"use client";

import Image from "next/image";

export default function AboutUs() {
    const sections = [
        { title: "অর্গানিক খাবার", description: "আমরা প্রাকৃতিক ও অর্গানিক খাবারের মাধ্যমে সুস্থতা নিশ্চিত করি।", logo: "/categories/images.jpg" },
        { title: "গেজেট", description: "সর্বাধুনিক প্রযুক্তির গেজেট এখানে পাওয়া যায়।", logo: "/categories/maxresdefault.jpg" },
        { title: "মেডিকেল সরঞ্জাম", description: "স্বাস্থ্যসেবার জন্য প্রয়োজনীয় সরঞ্জাম সহজে পাওয়া যায়।", logo: "/categories/medicine-elements-tools_667648-1830.jpg" },
        { title: "ফ্যাশন", description: "আপনার স্টাইলকে নতুন রূপ দিন আমাদের ফ্যাশন কালেকশনের সাথে।", logo: "/categories/1600w-ABoOPrHi6D8.webp" },
        { title: "ইলেকট্রনিক্স", description: "উচ্চমানের ইলেকট্রনিক্স প্রোডাক্টসের ভাণ্ডার।", logo: "/categories/applications-of-electronics.png" },
        { title: "সোর্সিং সার্ভিস", description: "আপনার ব্যবসার জন্য প্রয়োজনীয় সকল সোর্সিং সাপোর্ট।", logo: "/categories/AdobeStock_124121137-1568x1045.jpeg" },
        { title: "সাজসজ্জা", description: "ঘর সাজাতে ও সুন্দর করতে আমাদের কালেকশন।", logo: "/categories/living-room-rug-shelves-7b5d7a52-dcb3e3a7b7e04df99893aeaa76f57d08.jpg" },
        { title: "হেলথ্ এন্ড বিউটি", description: "স্বাস্থ্য ও সৌন্দর্য রক্ষার জন্য পণ্য।", logo: "/categories/health-beauty-studio-vector-logo-stroke-pink-rose-flower-illustration-brand-lettering-95564351.webp" },
        { title: "মা ও শিশু", description: "মা ও শিশুর জন্য নিরাপদ এবং মানসম্মত পণ্য।", logo: "/categories/360_F_455448048_94bxabQM0jCJA3zXMn7cAUfV4U01Ok8f.jpg" },
        { title: "লাইফস্টাইল", description: "আপনার দৈনন্দিন জীবনকে সহজ করার সব পণ্য।", logo: "/categories/lifestyle-logo-design-template-5e8c38a6b91aff44f6a05638a8dc7d1d_screen.jpg" },
        { title: "অন্যান্য", description: "বিভিন্ন প্রয়োজনীয় পণ্য একসাথে।", logo: "/categories/VJwzw5IGgePKH9vjq8XxocT3aiVxIdntOW9Ww81v.png" },
    ];

    return (
        <div className="px-6 md:px-24 py-10">
            <h1 className="sm:text-3xl text-xl font-bold text-green-600 mb-5 text-center">
                ❤️ আমাদের সম্পর্ক
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((sec) => (
                    <div key={sec.title} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition">
                        {/* লোগোর জায়গা */}
                        <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                            {sec.logo ? (
                                <Image src={sec.logo} alt={sec.title} width={80} height={80} className="object-contain" />
                            ) : (
                                <span className="text-gray-400">🖼️ Logo</span>
                            )}
                        </div>

                        {/* টেক্সট */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{sec.title}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{sec.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
