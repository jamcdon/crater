import { ForumTopicInput, ForumTopicOutput } from "../../../../db/nosql/models/ForumTopic";
import * as service from '../../../../db/nosql/services/forumTopicService'

export const create = async(payload: ForumTopicInput): Promise<ForumTopicOutput | undefined> => {
    return await service.create(payload)
}

export const getById = async(id: string): Promise<ForumTopicOutput | undefined> => {
    return await service.getById(id)
}

export const promote = async(topicID: string, userID: number): Promise<ForumTopicOutput | undefined> => {
    let topic = await service.getById(topicID)
    if (topic != undefined){
        topic.admins.push(userID)
        topic.promoterUserID = userID
        topic.active = true
        return await service.update(topic._id.toString(), topic)
    }
    return undefined
}

export const paginatePopularity = async(page: number): Promise<Array<ForumTopicOutput> | undefined> => {
    return await service.paginatePopularity(1)
}
export const paginateInactive = async(page: number): Promise<Array<ForumTopicOutput> | undefined> => {
    return await service.paginateInactive(1)
}