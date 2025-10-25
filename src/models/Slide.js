import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
    text: { type: String, required: true },
    imageUrl: { type: String, required: true },
    public_id: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Slide || mongoose.model("Slide", slideSchema);
