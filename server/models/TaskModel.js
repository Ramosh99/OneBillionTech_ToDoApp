import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    isRemoved: {
        type: Boolean,
        default: false
    },
    scheduledFor: {
        type: String,
        default: null
    }
}, { timestamps: true });

export default mongoose.model('Tasks', taskSchema);

