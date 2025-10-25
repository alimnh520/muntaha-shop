const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema(
    {
        product_name: { type: String, required: true, trim: true },
        product_image: [{ type: String, required: true }],
        image_id: [{ type: String, required: true }],
        price: { type: Number, required: true, min: 0 },

        deliveryCharge: { type: Number, default: 0, min: 0 },

        details: { type: String },

        category: {
            type: String,
            enum: [
                "organic_food",       // 🥬 Muntaha Organic Food — Pure Taste, Naturally Yours
                "construction",       // 🏗 Muntaha Construction — Building Dreams, Creating Future
                "electric",           // ⚡ Muntaha Electric — Powering Homes with Excellence
                "hardware",           // 🔩 Muntaha Hardware — Strong Tools, Strong Foundation
                "sanitary",            // 🚿 Mumtaz Sanitary — Clean Water, Clean Living
                "roofing_albestar",   // 🧱 Muntaha Roofing & Albestar — Protecting What Matters Most
                "gas_cylinder",       // 🔥 Muntaha Gas Cylinder — Safety, Quality & Reliability
                "cookeries_kitchen",  // 🍳 Muntaha Cookeries & Kitchen Items — Make Every Meal Special
            ],
            required: true,
        },

        discount: { type: Number, default: 0 },
        discountedPrice: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.Products || mongoose.model("Products", productSchema);
