import {Schema, model, Types } from 'mongoose';

interface IImage {
    id: String,
    image: String,
    hyperlink: String
}

const ImageModelSchema = new Schema({
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

const Image = model<IImage>('Image', ImageModelSchema)

export { Image }