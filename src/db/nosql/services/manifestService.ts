import * as composeDAL from '../dal/Compose'
import { ComposeInput, ComposeOutput } from '../models/Compose'

export const create = (payload: ComposeInput): Promise<ComposeOutput | undefined> => {
    return composeDAL.create(payload)
}

export const deleteById = (id: string): Promise<boolean> => {
    return composeDAL.deleteById(id)
}

export const paginatePopularity = (page: number): Promise<Array<ComposeOutput> | undefined> => {
    return composeDAL.paginatePopularityManifests(page)
}