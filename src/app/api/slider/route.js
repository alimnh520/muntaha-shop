import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDb";
import Slide from "@/models/Slide";
import { UploadImage } from "@/cloudinary/cloudUpload";
import cloudinary from "@/cloudinary/cloudConfig";
import { getCollection } from "@/lib/mongoClient";

export async function GET() {
    try {
        const collection = await getCollection("slides");
        const slides = await collection.find({}).toArray();
        return NextResponse.json({ slides });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'সার্ভারে সমস্যা', success: false });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const count = await Slide.countDocuments();
        if (count >= 6) {
            return NextResponse.json({
                success: false,
                message: "❌ সর্বোচ্চ ৬টা স্লাইড দেওয়া যাবে!",
            });
        }

        const formData = await req.formData();
        const image = formData.get("image");
        const text = formData.get("text");

        const uploaded = await UploadImage(image);

        const slide = await Slide.create({
            text,
            imageUrl: uploaded.secure_url,
            public_id: uploaded.public_id,
        });

        return NextResponse.json({ success: true, slide });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Server error" });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { id } = await req.json();
        const slide = await Slide.findById(id);
        if (!slide) return NextResponse.json({ success: false, message: "Slide not found!" });

        await cloudinary.uploader.destroy(slide.public_id.toString(), { resource_type: "image" });
        await Slide.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "🗑️ Slide deleted!" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Delete failed" });
    }
}
