// app/api/admin/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getCollection } from "@/lib/mongoClient";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ success: false, message: "Email and password required" }, { status: 400 });
        }


        const collection = await getCollection('admin');

        const admin = await collection.findOne({ email });

        if (!admin) {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
        }

        // const match = await bcrypt.compare(password, admin.password);

        if (password !== admin.password) {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign(
            { id: admin._id.toString(), email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const response = NextResponse.json({ message: 'login successful', success: true });
        response.cookies.set('muntaha-shop', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 24 * 60 * 60,
            sameSite: 'strict',
            path: '/'
        });

        return response;

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
