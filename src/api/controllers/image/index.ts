import * as service from '../../../db/nosql/services/imageService'
import { QueryObject } from '../../../db/nosql/models'
import { IImage } from '../../../db/nosql/models/Image'
import { CreateImageDTO, UpdateImageDTO } from '../../dto/image.dto'
import * as interactionsService from '../../../db/sql/services/interactionsService'
import * as mapper from './mapper'

export const create = async(payload: CreateImageDTO): Promise<IImage | undefined> => {
    const image = await service.create(payload)
    if (image != undefined){
        const interactionsSuccess = await interactionsService.setCreator(image.authorID, undefined, image._id.toString())
        if (!interactionsSuccess){
            await service.deleteById(image._id.toString())
            return undefined
        }
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

export const paginate = async(page: number): Promise<QueryObject | undefined> => {
    const imageNames = await service.paginate(page)
    return imageNames
}

export const paginateNameOnly = async(page: number): Promise<Array<string> | undefined> => {
    const queryOject = await paginate(page)
    if (queryOject != undefined){
        let imageArray = []
        for (let i=0; i < queryOject.length; i++){
            imageArray.push(queryOject[i].name)
        }
        return imageArray
    }
    return undefined
}

export const getCount = async(): Promise<number> => {
    return await service.getCount()
}