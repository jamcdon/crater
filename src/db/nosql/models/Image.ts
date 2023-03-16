import mongoose, {Schema, model } from 'mongoose';

export interface IImage {
    _id: mongoose.Types.ObjectId,
    name: string,
    hyperlink: string,
    scriptsUsing: number,
    authorID: number
}

export interface IImageStr {
    _id: string,
    name: string,
    hyperlink: string,
    scriptsUsing: string,
    authorID: string
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
        required: true,
        unique: true
    },
    hyperlink: {
        type: String,
        required: true,
        unique: true
    },
    scriptsUsing: {
        type: Number,
        required: true
    },
    authorID: {
        type: Number,
        required: true
    }
})

const Image = model<IImage>('Image', ImageModelSchema)

export { Image }