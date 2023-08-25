import * as forumPostDAL from '../dal/ForumPost'
import { ForumPostInput, ForumPostOutput } from '../models/ForumPost'

export const create = async (payload: ForumPostInput): Promise<ForumPostOutput | undefined> => {
    return forumPostDAL.create(payload)
}

export const deleteById = async (id: string): Promise<boolean> => {
    return forumPostDAL.deleteById(id)
}

export const getById = async (id: string): Promise<ForumPostOutput | undefined> => {
    return forumPostDAL.getById(id)
}

export const update = async (id: string, payload: ForumPostInput): Promise<ForumPostOutput | undefined> => {
    return forumPostDAL.update(id, payload)
}

export const paginatePopularity = async(page: number): Promise<Array<ForumPostOutput> | undefined> => {
    return forumPostDAL.paginatePopularity(page)
}

export const paginateByImageID = async(page: number, imageID: string): Promise<Array<ForumPostOutput> | undefined> => {
    return forumPostDAL.paginateByImageID(page, imageID)
}