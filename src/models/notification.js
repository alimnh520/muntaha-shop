const { default: mongoose } = require("mongoose");

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },

    isRead: { type: Boolean, default: false }
    
}, { timestamps: true });

export default mongoose.models.notifications || mongoose.model('notifications', notificationSchema);