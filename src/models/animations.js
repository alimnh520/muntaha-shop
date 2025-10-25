import mongoose from "mongoose";

const animationsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        photo: { type: String, required: true },
        photo_url: { type: String, required: true },
        details: { type: String, required: false },
    },
    { timestamps: true }
);

export default mongoose.models.animation || mongoose.model("animation", animationsSchema);
