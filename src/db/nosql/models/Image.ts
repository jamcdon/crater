import mongoose from 'mongoose';

const ImageModelSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    hyperlink: {
        type: String,
        required: true
    }
})

const Image = mongoose.model('Image', ImageModelSchema)

export { Image }