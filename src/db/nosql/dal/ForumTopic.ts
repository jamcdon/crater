import mongoose from 'mongoose'
import { ForumTopic } from '../models/ForumTopic'
import { ForumTopicInput, ForumTopicOutput } from '../models/ForumTopic'

export const create = async(payload: ForumTopicInput): Promise<ForumTopicOutput | undefined> => {
    //try {
        const topic = await ForumTopic.create(payload)
        topic.save()

        return topic
//    }
  //  catch {
    //    return undefined
    //}
}

export const deleteById = async (id: string): Promise<boolean> => {
    let toDelete = await getById(id)
    if (toDelete != undefined){
        const deletion = await ForumTopic.deleteOne({
            _id: id
        })

        return deletion.acknowledged
    }
    return false
}

export const getById = async (id: string): Promise<ForumTopicOutput | undefined> => {
    try {
        const topic = await ForumTopic.findById(id).lean()
        if (topic != null){
            return topic
        }
        return undefined
    }
    catch {
        return undefined
    }
}

export const update = async(id: string, payload: ForumTopicInput): Promise<ForumTopicOutput | undefined> => {
    try {
        await ForumTopic.findById(id)
    }
    catch {
        return undefined
    }
    const updatedTopic = await ForumTopic.findByIdAndUpdate(id, payload)
    if (!updatedTopic){
        return undefined
    }
    return updatedTopic
}

export const paginatePopularity = async(page: number): Promise<Array<ForumTopicOutput> | undefined> => {
    const values = page * 25
    try {
        return await ForumTopic.find(
            {
                active: true   
            },
            {},
            {
                skip: values - 25,
                limit: values,
                sort: {upvotes: -1}
            }
        ).lean()
    }
    catch {
        return undefined
    }
}

export const paginateInactive = async(page: number): Promise<Array<ForumTopicOutput> | undefined> => {
    const values = page * 25
    try {
        return await ForumTopic.find(
            {
                active: false
            },
            {},
            {
                skip: values - 25,
                limit: values,
                sort: {upvotes: -1}
            }
        ).lean()
    }
    catch {
        return undefined
    }
}