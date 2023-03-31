import * as composeDAL from '../dal/Compose'
import { ComposeInput, ComposeOutput } from '../models/Compose'
import { QueryArrayObject } from '../models'

export const create = (payload: ComposeInput): Promise<ComposeOutput | undefined> => {
    return composeDAL.create(payload)
}

export const deleteById = (id: string): Promise<boolean> => {
    return composeDAL.deleteById(id)
}

export const getById = (id: string): Promise<ComposeOutput | undefined> => {
    return composeDAL.getById(id)
}

export const paginatePopularity = (page: number): Promise<Array<ComposeOutput> | undefined> => {
    return composeDAL.paginatePopularity(page)
}

export const getByIds = (ids: Array<string>, findPublic: boolean, page: number): Promise<Array<ComposeOutput> | undefined> => {
    return composeDAL.getByIds(ids, findPublic, page)
}

export const paginateTag = (page: number): Promise<QueryArrayObject | undefined> => {
    return composeDAL.paginateTag(page)
}

export const paginateScriptsById = (id: string, page: number): Promise<Array<ComposeOutput> | undefined> => {
    return composeDAL.paginateScriptsById(id, page)
}