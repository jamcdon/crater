import * as service from '../../../db/nosql/services/imageService'
import { Image } from '../../../db/nosql/models'
import { IImage } from '../../../db/nosql/models/Image'
import { CreateImageDTO, UpdateImageDTO } from '../../dto/image.dto'
import CreateQuery from 'mongoose'
import * as mapper from './mapper'

export const create = async(payload: CreateImageDTO): Promise<IImage> => {
    console.log("src/api/controllers/image/index.ts")
    return mapper.toImage(await service.create(payload))
}

export const update = async(id: string, payload: UpdateImageDTO) => {
    return mapper.toImage(await service.update(id, payload))
}

export const getById = async (id: string): Promise<IImage> => {
    return mapper.toImage(await service.getById(id))
}

export const getByImageName = async (imageName: string): Promise<IImage> => {
    return mapper.toImage(await service.getByImageName(imageName))
}

export const deleteById = async (id: string): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}