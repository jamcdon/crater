import * as service from '../../../db/nosql/services/imageService'
import { Image, QueryObject } from '../../../db/nosql/models'
import { IImage } from '../../../db/nosql/models/Image'
import { CreateImageDTO, UpdateImageDTO } from '../../dto/image.dto'
import CreateQuery from 'mongoose'
import * as mapper from './mapper'

export const create = async(payload: CreateImageDTO): Promise<IImage | undefined> => {
    const image = await service.create(payload)
    if (image != undefined){
        return mapper.toImage(image)
    }
    return undefined
}

export const update = async(id: string, payload: UpdateImageDTO): Promise<Boolean> => {
    const image = await service.update(id, payload)
    if (image != undefined){
        mapper.toImage(image)
        return true
    }
    return false
}

export const getById = async (id: string): Promise<IImage | undefined> => {
    const image = await service.getById(id)
    if (image != undefined){
        return mapper.toImage(image)
    }
    return undefined
}

export const getByImageName = async (imageName: string): Promise<IImage | undefined> => {
    const image = await service.getByImageName(imageName)
    if (image != undefined){
        return mapper.toImage(image)
    }
    return undefined
}

export const deleteById = async (id: string): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}

export const paginate = async(page: number): Promise< QueryObject | undefined> => {
    const imageNames = await service.paginate(page)
    return imageNames
}

export const getCount = async(): Promise<number> => {
    return await service.getCount()
}