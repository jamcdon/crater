import * as imageDAL from '../dal/Image'
import { ImageInput, ImageOutput } from '../models/Image'

export const create = (payload: ImageInput): Promise<ImageOutput | undefined> => {
    return imageDAL.create(payload)
}

export const update = (id: string, payload: Partial<ImageInput>): Promise<ImageOutput | undefined> => {
    return imageDAL.update(id, payload)
}

export const getById = (id: string): Promise<ImageOutput | undefined> => {
    return imageDAL.getById(id)
}

export const getByImageName = (imageName: string): Promise<ImageOutput | undefined> => {
    return imageDAL.getByImageName(imageName)
}

export const deleteById = (id: string): Promise<boolean> => {
    return imageDAL.deleteById(id)
}