import mongoose from 'mongoose'
import { Image, QueryObject } from '../models'
import { ImageInput, ImageOutput } from '../models/Image'

export const create = async(payload: ImageInput): Promise<ImageOutput | undefined> => {
    payload._id = new mongoose.Types.ObjectId
    const image = await Image.create(payload)
    if (!image){
        return undefined
    }
    const createdUser: ImageOutput = {
        _id: image._id,
        name: image.name!,
        hyperlink: image.hyperlink!,
        scriptsUsing: image.scriptsUsing!
    }
    image.save()
    return createdUser
}

export const update = async(id: string, payload: Partial<ImageInput>): Promise<ImageOutput | undefined> => {
    try{
        const image = await Image.findById(id)
    }
    catch (err) {
        return undefined
    }
    const updatedImage = await Image.findByIdAndUpdate(id, payload)
    if (!updatedImage) {
        return undefined
    }
    return updatedImage
}

export const getById = async(id: string): Promise<ImageOutput | undefined> => {
    let image
    try {
        image = await Image.findById(id)
    }
    catch (err) {
        return undefined
    }
    if (image != null){
        return image
    }
}

export const getByImageName = async(imageName: string): Promise<ImageOutput | undefined > => {
    let image
    try{
        image = await Image.findOne({
            name: {
                $regex: new RegExp(`^${imageName}$`, "i")
            }
        
        }).exec()
    }
    catch (err){
        return undefined
    }
    if (image != null) {
        return image
    }
    return undefined
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedImageBool = await Image.findByIdAndDelete(id)
    return !!deletedImageBool
}

export const paginate = async (page: number): Promise< QueryObject | undefined> => {
    const values = page * 25
    const imageNames: QueryObject = await Image.find(
        {},
        {
            name: 1
        },
        {
            skip: values - 25,
            limit: values,
            sort: {"scriptsUsing": 1}
        },
    ).lean()

    return imageNames
}

export const getCount = async(): Promise<number> => {
    console.log(Image.count())
    return await Image.count()
}
