import { ForumPostInput, ForumPostOutput } from "../../../../db/nosql/models/ForumPost";
import * as service from '../../../../db/nosql/services/forumPostService'
import { ForumInteractionDTO } from "../../../dto/interactions.dto";
import * as interactionsService from '../../../../db/sql/services/interactionsService'

export const create = async(payload: ForumPostInput): Promise<ForumPostOutput | undefined> => {
    const post = await service.create(payload)
    if (post != undefined){
        const payload: ForumInteractionDTO = {
            comment: false,
            post: true,
            topic: false,
            postID: post._id.toString(),
            userID: post.posterUserID,
            creator: true,
            upvote: undefined 
        }
        const interaction = await interactionsService.setForumInteraction(payload)
        if (interaction == false){
            await service.deleteById(post._id.toString())
            return undefined
        }
    }
    return post
}

export const getById = async(id: string): Promise<ForumPostOutput | undefined> => {
    return await service.getById(id)
}

export const paginatePopularity = async(page: number): Promise<Array<ForumPostOutput> | undefined> => {
    return await service.paginatePopularity(page)
}