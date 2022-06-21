import mongoose from 'mongoose';

const ComposeModelSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    imageID: {
        type: Number,
        required: true
    },
    tags: [
        {
            type: String,
            required: false
        }
    ],
    public: {
        type: Boolean,
        required: true,
        default: true
    },
    content: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
})

const Compose = mongoose.model('Compose', ComposeModelSchema)

export { Compose }