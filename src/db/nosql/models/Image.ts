import mongoose, {Schema, model } from 'mongoose';

export interface IImage {
    _id: mongoose.Types.ObjectId,
    name: string,
    hyperlink: string,
    description: string,
    scriptsUsing: number,
    reports: number,
    authorID: number
}

export interface IImageStr {
    _id: string,
    name: string,
    hyperlink: string,
    description: string,
    scriptsUsing: string,
    reports: string,
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
    description: {
        type: String,
        required: true,
        unique: false
    },
    scriptsUsing: {
        type: Number,
        required: true
    },
    reports: {
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