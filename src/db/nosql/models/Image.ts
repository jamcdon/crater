import {Schema, model, Types } from 'mongoose';

export interface IImage {
    _id: String,
    name: String,
    hyperlink: String,
}

export interface ImageInput extends Partial<IImage> {}
export interface ImageOutput extends Required<IImage> {}

const ImageModelSchema = new Schema({
    _id: {
        type: String,
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