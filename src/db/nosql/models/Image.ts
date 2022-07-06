import mongoose, {Schema, model, Types } from 'mongoose';

export interface IImage {
    _id: mongoose.Types.ObjectId,
    name: String,
    hyperlink: String,
}

export interface ImageInput extends Partial<IImage> {}
export interface ImageOutput extends Required<IImage> {}

const ImageModelSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
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