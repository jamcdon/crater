import * as forumTopicDAL from '../dal/ForumTopic'
import { ForumTopicInput, ForumTopicOutput } from '../models/ForumTopic'

export const create = async (payload: ForumTopicInput): Promise<ForumTopicOutput | undefined> => {
    return forumTopicDAL.create(payload)
}

export const deleteById = async (id: string): Promise<boolean> => {
    return forumTopicDAL.deleteById(id)
}

export const getById = async (id: string): Promise<ForumTopicOutput | undefined> => {
    return forumTopicDAL.getById(id)
}

export const update = async (id: string, payload: ForumTopicInput): Promise<ForumTopicOutput | undefined> => {
    return forumTopicDAL.update(id, payload)
}

export const incrementTopicPosts = async (id: string): Promise<void> => {
    let topic = await forumTopicDAL.getById(id)
    if (topic != null){
        topic.posts++
        forumTopicDAL.update(id, topic)
    }
}

export const decrementTopicPosts = async (id: string): Promise<void> => {
    let topic = await forumTopicDAL.getById(id)
    if (topic != null){
        topic.posts--
        forumTopicDAL.update(id, topic)
    }
}

export const paginatePopularity = async(page: number): Promise<Array<ForumTopicOutput> | undefined> => {
    return forumTopicDAL.paginatePopularity(page)
}

export const paginateInactive = async(page: number): Promise<Array<ForumTopicOutput> | undefined> => {
    return forumTopicDAL.paginateInactive(page)
}