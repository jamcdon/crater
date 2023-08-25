import { ForumPost } from '../models'
import { ForumPostInput, ForumPostOutput } from '../models/ForumPost'
import { incrementTopicPosts, decrementTopicPosts } from '../services/forumTopicService'

export const create = async(payload: ForumPostInput): Promise<ForumPostOutput | undefined> => {
    try {
        const forumPost = await ForumPost.create(payload)
        forumPost.save()
        
        incrementTopicPosts(forumPost.topicID.toString())

        return forumPost
    }
    catch {
        return undefined
    }
}

export const deleteById = async(id: string): Promise<boolean> => {
    const toDelete = await getById(id)
    if (toDelete != undefined){
        const deletion = await ForumPost.deleteOne({
            _id: id
        })
        decrementTopicPosts(toDelete.topicID.toString())

        return deletion.acknowledged
    }

    return false
}

export const getById = async(id: string): Promise<ForumPostOutput | undefined> => {
    try {
        const forumPost = await ForumPost.findById(id)
        if (forumPost == null){
            return undefined
        }
        return forumPost
    }
    catch {
        return undefined
    }
}

export const update = async(id: string, payload: Partial<ForumPostInput>): Promise<ForumPostOutput | undefined> => {
    try {
        await ForumPost.findById(id)
    }
    catch {
        return undefined
    }
    const updatedPost = await ForumPost.findByIdAndUpdate(id, payload)
    if (!updatedPost) {
        return undefined
    }

    return updatedPost
}

export const paginatePopularity = async (page: number): Promise<Array<ForumPostOutput> | undefined> => {
    const values = page * 25
    try {
        const forumPosts = await ForumPost.find(
            {},
            {},
            {
                skip: values - 25,
                limit: values,
                sort: {upvotes: -1}
            }
        )

        return forumPosts
    }
    catch {
        return undefined
    }
}

export const paginateByImageID = async (page: number, imageID: string): Promise<Array<ForumPostOutput> | undefined> => {
    const values = page * 25
    try {
        const forumPosts = await ForumPost.find(
            {
                imageID: imageID
            },
            {},
            {
                skipe: values - 25,
                limit: values,
                sort: {upvotes: -1}
            }
        )

        return forumPosts
    }
    catch {
        return undefined
    }
}