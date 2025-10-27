import "./globals.css";
import Provider from "./Provider";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: " Muntaha Multi Trade | অনলাইন শপিং ও সাপোর্ট সেন্টার",
  description:
    "Muntaha Multi Trade একটি নির্ভরযোগ্য অনলাইন শপিং ও সাপোর্ট সেন্টার। এখানে আপনি অর্গানিক ফুড, ইলেকট্রিক, হার্ডওয়্যার, স্যানিটারি, কনস্ট্রাকশন, কুকারিজ এবং আরও নানা দরকারি পণ্য অর্ডার করতে পারবেন। দ্রুত ডেলিভারি ও নির্ভরযোগ্য সার্ভিস আমাদের অঙ্গীকার।",
  keywords: [
    "Muntaha Multi Trade",
    "Online Shop",
    "Organic Food",
    "Construction Items",
    "Hardware",
    "Sanitary",
    "Cookeries",
    "Kitchen Items",
    "Bangladesh Online Store",
  ],
  authors: [{ name: "Nahid Hasan", url: "https://wa.link/29e1ei" }],
  openGraph: {
    title: "Muntaha Multi Trade | অনলাইন শপিং ও সাপোর্ট সেন্টার",
    description:
      "Muntaha Multi Trade থেকে সহজেই অর্ডার করুন — অর্গানিক ফুড, কনস্ট্রাকশন, ইলেকট্রিক, হার্ডওয়্যার ও আরও অনেক কিছু এক জায়গায়।",
    url: "https://muntaha-multi-trade.vercel.app/",
    siteName: "Muntaha Multi Trade",
    images: [
      {
        url: "/my-logo.png",
        width: 800,
        height: 600,
        alt: "Muntaha Multi Trade Logo",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  icons: {
    icon: "/my-logo.png",
    shortcut: "/my-logo.png",
    apple: "/my-logo.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Provider>
          {children}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
