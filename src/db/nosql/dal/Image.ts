import mongoose from 'mongoose'
import { Image, QueryObject } from '../models'
import { ImageInput, ImageOutput } from '../models/Image'

export const create = async(payload: ImageInput): Promise<ImageOutput | undefined> => {
    payload._id = new mongoose.Types.ObjectId
    try {
        const image = await Image.create(payload)
        if (!image){
            return undefined
        }
        const createdUser: ImageOutput = {
            _id: image._id,
            name: image.name!,
            hyperlink: image.hyperlink!,
            description: image.description!,
            scriptsUsing: image.scriptsUsing!,
            reports: image.reports!,
            authorID: image.authorID
        }
        image.save()
        return createdUser
    }
    catch {
        return undefined
    }
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
    let imageNames: QueryObject | undefined = undefined
    try {
        imageNames = await Image.find(
            {},
            {
                name: 1,
                scriptsUsing: 1
            },
            {
                sort: {scriptsUsing: -1},
                skip: values - 25,
                limit: values
            },
        ).lean()
    }
    catch(err){
        return undefined
    }

    return imageNames
}

export const getCount = async(): Promise<number> => {
    return await Image.count()
}

export const adminPaginateByDate = async(page: number): Promise<Array<ImageOutput> | undefined> => {
    const values = page * 25
    let images: ImageOutput[] | undefined = undefined
    try {
        images = await Image.find(
            {},
            {},
            {
                sort: {_id: -1},
                skip: values - 25,
                limit: values
            }
        )
    }
    catch(err){
        return undefined
    }
    return images
}


export const fuzzySearch = async(query: string, page: number): Promise<QueryObject | undefined> => {
    const values = page * 25
    const regex = new RegExp(query, 'gi')

    let imageNames: QueryObject | undefined = undefined
    try {
        imageNames = await Image.find(
            {
                name: regex
            },
            {
                name: 1,
                scriptsUsing: 1
            },
            {
                sort: {scriptsUsing: -1},
                skipe: values - 25,
                limit: values
            }
        ).lean()
    }
    catch {
        return undefined
    }
    return imageNames
}