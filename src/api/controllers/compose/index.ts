import { CreateComposeDTO } from '../../dto/compose.dto'
import { ComposeModification, ICompose } from '../../../db/nosql/models/Compose'
import * as mapper from './mapper'
import * as service from '../../../db/nosql/services/composeService'
import * as userService from '../../../db/sql/services/userService'
import * as interactionsService from '../../../db/sql/services/interactionsService'
import { redisClient } from '../../../db/cache/init'

export const create = async(payload: CreateComposeDTO): Promise<ICompose | undefined> => {
    const compose = await service.create(payload)
    if (compose != undefined){
        const interactionsSuccess = await interactionsService.setCreator(compose.authorID, compose._id.toString(), undefined)
        if (!interactionsSuccess){
            await service.deleteById(compose._id.toString())
            return undefined
        }
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

export const paginatePopularity = async (page: number): Promise<Array<ICompose> | Array<ComposeModification> | undefined> => {
    let composes: ComposeModification[] | ICompose[] | undefined
    const composeOutput = await service.paginatePopularity(page)
    if (composeOutput != undefined){
        composes = await mapper.toComposeModifications(composeOutput)
        if (composes != undefined){
            return composes
        }
    }
    return undefined
}

export const getUsernameByID = async (id: number): Promise<string | undefined> => {
    const idString = id.toString()
    const cacheUsername = await getUsername(idString)

    if (cacheUsername != undefined){
        return cacheUsername
    }

    const username = await userService.getUsernameByID(id)
    if (username != undefined){
        setUsername(idString, username)
        return username
    }
    return undefined
}

export const setUsername = async (idString: string, username: string): Promise<boolean> => {
    const inCache = redisClient.set(idString, username)
    if (inCache != null){
        redisClient.expire(idString, 252900) // set TTL 3 days
        return true
    }
    return false
}

export const getUsername = async (idString: string): Promise<string | undefined> => {
    const username = await redisClient.get(idString)
    if (username != null){
        redisClient.expire(idString, 252900) // reset TTL 3 more days
        return username
    }
    return undefined
}


export const paginateScriptsById = async(id: string, page: number): Promise<Array<ICompose> | undefined> => {
    return await service.paginateScriptsById(id, page)
}
