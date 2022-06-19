import mongoose from 'mongoose';

const CommentModelSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})