import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongoClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const collection = await getCollection("notifications");
        const notifications = await collection.find({}).toArray();
        return NextResponse.json({ success: true, message: notifications });
    } catch (error) {
        return NextResponse.json({ message: 'failed', success: false });
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();
        const collection = await getCollection("notifications");
        await collection.deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ success: true, message: 'ডাটা মুছে ফেলা হয়েছে' });
    } catch (error) {
        return NextResponse.json({ message: 'failed', success: false });
    }
}

export async function PUT(request) {
    try {
        const collection = await getCollection("notifications");
        await collection.updateMany(
            {},
            { $set: { isRead: true } }
        );
        return NextResponse.json({ success: true, message: '' });
    } catch (error) {
        console.error("Fetch Admission Data Error:", error);
        return NextResponse.json({ success: false, message: "ডাটা আনা যায়নি!" }, { status: 500 });
    }
}