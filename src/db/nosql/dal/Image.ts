import { Image } from '../models'
import { ImageInput, ImageOutput } from '../models/Image'

export const create = async(payload: ImageInput): Promise<ImageOutput> => {
    const image = await Image.create(payload)
    console.log("src/db/nosql/dal/Image.ts")
    console.log(image)
    if (!image){
        throw new Error('could not create')
    }
    image.save()
    const createdUser: ImageOutput = {
        _id: image._id,
        name: image.name!,
        hyperlink: image.hyperlink!
    }
    return createdUser
}

export const update = async(id: string, payload: Partial<ImageInput>): Promise<ImageOutput> => {
    const image = await Image.findById(id)
    if (!image) {
        throw new Error('not found')
    }
    const updatedImage = await Image.findByIdAndUpdate(id, payload)
    if (!updatedImage) {
        throw new Error('could not update')
    }
    return updatedImage
}

export const getById = async(id: string): Promise<ImageOutput> => {
    const image = await Image.findById(id)
    if (!image) {
        throw new Error('not found')
    }
    return image
}

export const getByImageName = async(imageName: string): Promise<ImageOutput> => {
    const image = await Image.findOne({
        name: /imageName/i
        
    })
    if (!image) {
        throw new Error('not found')
    }
    return image
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedImageBool = await Image.findByIdAndDelete(id)
    return !!deletedImageBool
}