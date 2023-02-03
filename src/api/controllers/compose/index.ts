import { CreateComposeDTO } from '../../dto/compose.dto'
import { ICompose } from '../../../db/nosql/models/Compose'
import * as mapper from './mapper'
import * as service from '../../../db/nosql/services/composeService'

export const create = async(payload: CreateComposeDTO): Promise<ICompose | undefined> => {
    const compose = await service.create(payload)
    if (compose != undefined){
        return mapper.toCompose(compose)
    }
    return undefined
}

export const getById = async (id: string): Promise<ICompose | undefined> => {
    const compose = await service.getById(id)
    if (compose != undefined){
        return mapper.toCompose(compose)
    }
    return undefined
}

export const createRaw = async (id: string): Promise<string | undefined> => {
    const compose = await service.getById(id)
    if (compose != undefined){
        const composeYaml = compose.yaml
        return composeYaml
    }
    return undefined
}

export const paginatePopularity = async (page: number): Promise<Array<ICompose> | undefined> => {
    const composes = await service.paginatePopularity(page)
    if (composes != undefined){
        return composes
    }
    return undefined
}