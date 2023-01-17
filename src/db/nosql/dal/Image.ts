import mongoose from 'mongoose'
import { Image } from '../models'
import { ImageInput, ImageOutput } from '../models/Image'

export const create = async(payload: ImageInput): Promise<ImageOutput | undefined> => {
    payload._id = new mongoose.Types.ObjectId
    const image = await Image.create(payload)
    console.log(image)
    if (!image){
        return undefined
    }
    const createdUser: ImageOutput = {
        _id: image._id,
        name: image.name!,
        hyperlink: image.hyperlink!
    }
    image.save()
    return createdUser
}

export const update = async(id: string, payload: Partial<ImageInput>): Promise<ImageOutput | undefined> => {
    const image = await Image.findById(id)
    if (!image) {
        return undefined
    }
    const updatedImage = await Image.findByIdAndUpdate(id, payload)
    if (!updatedImage) {
        return undefined
    }
    return updatedImage
}

export const getById = async(id: string): Promise<ImageOutput | undefined> => {
    const image = await Image.findById(id)
    if (!image) {
        return undefined
    }
    return image
}

export const getByImageName = async(imageName: string): Promise<ImageOutput | undefined > => {
    const image = await Image.findOne({
        name: {
            $regex: new RegExp(`^${imageName}$`, "i")
        }
        
    }).exec()
    if (!image) {
        return undefined
    }
    return image
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedImageBool = await Image.findByIdAndDelete(id)
    return !!deletedImageBool
}