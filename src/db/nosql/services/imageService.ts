import * as imageDAL from '../dal/Image'
import { QueryObject } from '../models'
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

export const paginate = (page: number): Promise< QueryObject | undefined> => {
    return imageDAL.paginate(page)
}

export const getCount = (): Promise<number> => {
    return imageDAL.getCount()
}

export const incrementScriptsUsing = async(imageID: string): Promise<void> => {
    let image = await imageDAL.getById(imageID)
    if (image != undefined){
        image.scriptsUsing++
        imageDAL.update(imageID, image)
    }
}

export const adminPaginateByDate = async(page: number): Promise<Array<ImageOutput> | undefined> => {
    return imageDAL.adminPaginateByDate(page)
}