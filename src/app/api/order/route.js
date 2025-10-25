import { connectDB } from "@/lib/connectDb";
import { getCollection } from "@/lib/mongoClient";
import notification from "@/models/notification";
import Order from "@/models/orders";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        const {
            productId,
            quantity,
            name,
            mobile,
            division,
            district,
            upazilla,
            address,
            date
        } = await request.json();

        if (!productId || !quantity || !name || !mobile || !division || !district || !upazilla || !address) {
            return NextResponse.json({ message: '⚠️ সকল তথ্য প্রদান করুন!', success: false });
        }

        await connectDB();

        const productCollection = await getCollection("products");
        const product = await productCollection.findOne({ _id: new ObjectId(productId) });

        if (!product) {
            return NextResponse.json({ message: "❌ পণ্য পাওয়া যায়নি!", success: false });
        }

        // ডিসকাউন্ট প্রয়োগ
        const price = product.discount > 0
            ? Math.round(product.price - (product.price * product.discount) / 100)
            : product.price;

        // প্রোডাক্টের নিজস্ব ডেলিভারি চার্জ ব্যবহার
        const deliveryCharge = product.deliveryCharge || 0;
        const totalPrice = (price * quantity) + deliveryCharge;

        // নোটিফিকেশন সেভ
        const saveNotify = new notification({
            title: `${product.product_name} এর নতুন অর্ডার এসেছে!`
        });
        await saveNotify.save();

        // অর্ডার সেভ
        const saveOrder = new Order({
            productId,
            productName: product.product_name,
            productImage: product.product_image?.[0] || "",
            price,
            quantity,
            deliveryCharge,
            totalPrice,
            name,
            mobile,
            division,
            district,
            upazilla,
            address,
            paymentMethod: "Cash on Delivery",
            date: date || new Date().toISOString(),
            status: "pending"
        });

        await saveOrder.save();

        // পণ্যের বিক্রয় সংখ্যা বাড়ানো
        await productCollection.updateOne(
            { _id: new ObjectId(productId) },
            { $inc: { soldCount: quantity || 1 } }
        );

        return NextResponse.json({
            message: '✅ অর্ডার সফলভাবে সম্পন্ন হয়েছে 🎉',
            success: true
        });

    } catch (error) {
        console.error("❌ Order API Error:", error);
        return NextResponse.json({
            message: '⚠️ সার্ভারে কোনো সমস্যা হয়েছে!',
            success: false
        });
    }
}


export async function GET() {
    try {
        const collection = await getCollection("orders");
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'সার্ভারে সমস্যা', success: false });
    }
}

export async function PATCH(request) {
    try {
        const { orderId, status } = await request.json();
        const collection = await getCollection("orders");
        await collection.findOneAndUpdate({ _id: new ObjectId(orderId) }, {
            $set: {
                status
            }
        });
        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'সার্ভারে সমস্যা', success: false });
    }
}