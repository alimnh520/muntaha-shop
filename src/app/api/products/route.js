import { UploadImage } from "@/cloudinary/cloudUpload";
import { connectDB } from "@/lib/connectDb";
import { getCollection } from "@/lib/mongoClient";
import products from "@/models/products";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import cloudinary from "@/cloudinary/cloudConfig";


export async function POST(req) {
    try {
        const formData = await req.formData();
        const name = formData.get("name");
        const price = formData.get("price");
        const deliveryCharge = formData.get("deliveryCharge") ? Number(formData.get("deliveryCharge")) : 0;
        const details = formData.get("details");
        const category = formData.get("category");
        const images = formData.getAll("images");

        if (!category) return NextResponse.json({ success: false, message: "⚠️ ক্যাটাগরি নির্বাচন করুন!" });
        if (!images || images.length === 0) return NextResponse.json({ success: false, message: "⚠️ অন্তত ১টি ছবি আপলোড করুন!" });

        await connectDB();

        const uploadedImages = [];
        const uploadedIds = [];

        for (const img of images) {
            const uploaded = await UploadImage(img);
            uploadedImages.push(uploaded.secure_url);
            uploadedIds.push(uploaded.public_id);
        }

        const saveProduct = new products({
            product_name: name,
            product_image: uploadedImages,
            image_id: uploadedIds,
            price: Number(price),
            deliveryCharge,
            details,
            category,
        });

        await saveProduct.save();

        return NextResponse.json({ success: true, message: "✅ পণ্য সফলভাবে যোগ করা হয়েছে!" });

    } catch (error) {
        console.error("❌ সার্ভার এরর:", error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}

// 🟢 সব প্রোডাক্ট নিয়ে আসা
export async function GET() {
    try {
        const collection = await getCollection("products");
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}

// 🟢 প্রোডাক্ট আপডেট (price, discount, deliveryCharge, category, images)
export async function PATCH(req) {
    try {
        const formData = await req.formData();

        const id = formData.get("id");
        const price = formData.get("price") ? Number(formData.get("price")) : null;
        const discount = formData.get("discount") ? Number(formData.get("discount")) : 0;
        const deliveryChargeInput = formData.get("deliveryCharge");
        const category = formData.get("category");
        const newImages = formData.getAll("newImages");

        if (!id || price === null) return NextResponse.json({ success: false, message: "⚠️ দাম দিন!" });

        const collection = await getCollection("products");
        const product = await collection.findOne({ _id: new ObjectId(id) });
        if (!product) return NextResponse.json({ success: false, message: "❌ পণ্য পাওয়া যায়নি!" });

        const updateData = { price, discount };

        // ডেলিভারি চার্জ আপডেট
        if (deliveryChargeInput !== null && deliveryChargeInput !== "") {
            updateData.deliveryCharge = Number(deliveryChargeInput);
        }

        if (category) updateData.category = category;

        // ইমেজ আপডেট
        if (newImages && newImages.length > 0) {
            if (Array.isArray(product.image_id) && product.image_id.length > 0) {
                await Promise.all(
                    product.image_id.map(async (imgId) => {
                        try {
                            await cloudinary.uploader.destroy(imgId, { resource_type: "image" });
                        } catch (err) {
                            console.warn("❗ পুরোনো ইমেজ ডিলিট সমস্যা:", imgId);
                        }
                    })
                );
            }

            const uploadedImages = await Promise.all(
                newImages.map(async (img) => {
                    const result = await UploadImage(img);
                    return { url: result.secure_url, id: result.public_id };
                })
            );

            updateData.product_image = uploadedImages.map((i) => i.url);
            updateData.image_id = uploadedImages.map((i) => i.id);
        }

        await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

        return NextResponse.json({
            success: true,
            message: "✅ পণ্য আপডেট হয়েছে!",
            updatedImages: updateData.product_image || product.product_image,
        });

    } catch (err) {
        console.error("PATCH error:", err);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}

// 🟢 প্রোডাক্ট ডিলিট
export async function DELETE(req) {
    try {
        const { id } = await req.json();
        if (!id) return NextResponse.json({ success: false, message: "⚠️ পণ্যের আইডি পাওয়া যায়নি!" });

        const collection = await getCollection("products");
        const product = await collection.findOne({ _id: new ObjectId(id) });
        if (!product) return NextResponse.json({ success: false, message: "❌ পণ্য পাওয়া যায়নি!" });

        if (Array.isArray(product.image_id) && product.image_id.length > 0) {
            for (const imgId of product.image_id) {
                try {
                    await cloudinary.uploader.destroy(imgId.toString(), { resource_type: "image" });
                } catch (err) {
                    console.warn("⚠️ ইমেজ ডিলেট এrror:", imgId, err.message);
                }
            }
        }

        await collection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true, message: "🗑️ পণ্য ও সব ছবি সফলভাবে ডিলেট হয়েছে!" });

    } catch (err) {
        console.error("❌ Delete error:", err);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর!" });
    }
}
