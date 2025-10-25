// app/api/admin/change-password/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getCollection } from '@/lib/mongoClient';
import { ObjectId } from 'mongodb';


export async function POST(req) {
    try {
        const body = await req.json();
        const { newPassword } = body || {};

        if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
            return NextResponse.json({ success: false, message: 'পাসওয়ার্ড অন্তত 8 অক্ষরের হতে হবে।' }, { status: 400 });
        }

        // hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashed = await bcrypt.hash(newPassword, salt);

        const collection = await getCollection('admin');

        await collection.updateOne(
            { _id: new ObjectId('68fc6c181d9e176774fd8098') },
            { $set: { password: newPassword } }
        );

        return NextResponse.json({ success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।' });

    } catch (err) {
        console.error('Change password error:', err);
        return NextResponse.json({ success: false, message: 'সার্ভার এরর।' }, { status: 500 });
    }
}
