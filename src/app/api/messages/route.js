import { connectDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";
import Message from "@/models/message";
import { getCollection } from "@/lib/mongoClient";
import { ObjectId } from "mongodb";
import notification from "@/models/notification";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, phone, message } = body;

        if (!name || !phone || !message) {
            return NextResponse.json({ success: false, message: "সব ঘর পূরণ করুন!" });
        }

        await connectDB();

        const saveNotify = new notification({
            title: `${phone} থেকে বার্তা এসেছে!`
        });
        await saveNotify.save();

        const newMessage = new Message({ name, phone, message });
        await newMessage.save();

        return NextResponse.json({ success: true, message: "✅ বার্তা পাঠানো হয়েছে!" });
    } catch (error) {
        console.error("Message Error:", error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}

export async function GET() {
    try {
        const collection = await getCollection('messages');
        const messages = await collection.find({}).toArray();
        return NextResponse.json({ success: true, message: messages });
    } catch (error) {
        console.error("Message Fetch Error:", error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();
        const collection = await getCollection('messages');
        await collection.deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ success: true, message: "বার্তা ডিলেট হয়েছে!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "সার্ভার এরর" });
    }
}
