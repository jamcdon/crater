import { ForumCommentInput, ForumCommentOutput } from "../../../../db/nosql/models/ForumComment"
import * as service from '../../../../db/nosql/services/forumCommentService'
import * as interactionsService from '../../../../db/sql/services/interactionsService'
import { ForumInteractionDTO } from '../../../dto/interactions.dto'

export const create = async(payload: ForumCommentInput): Promise<ForumCommentOutput | undefined> => {
    const comment = await service.create(payload)
    if (comment != undefined){
        let interactionPayload: ForumInteractionDTO = {
            comment: true,
            post: false,
            topic: false,
            commentID: comment._id.toString(),
            postID: comment.postID,
            userID: comment.commenterID,
            creator: true
        }
        const interaction = await interactionsService.setForumInteraction(interactionPayload)
        if(interaction == false){
            await service.deleteById(comment._id.toString())
            return undefined
        }
    }
    return comment
}

export const getPaginated = async(postID: string, page: number): Promise<Array<ForumCommentOutput> | undefined> => {
    return await service.getPaginated(postID, page)
}

export const updateById = async(id: string, userID: number, content: string): Promise<ForumCommentOutput | undefined> => {
    const comment = await service.getById(id)
    if (comment != undefined && comment.commenterID == userID){
        return await service.update(id, content)
    }
    return undefined
}

export const deleteComment = async(id: string, userID: number): Promise<boolean> => {
    const comment = await service.getById(id)
    if (comment != undefined && comment.commenterID == userID){
        return await service.deleteById(id)
    }
    return false
}

export const checkIfUpvoted = async(commentID: string, userID: number): Promise<number> => {
    return await interactionsService.checkIfForumCommentUpvoted(commentID, userID)
}

export const upvoteDownvote = async(id: string, upvote: boolean, userID: number, alreadyUpvoted: number): Promise<number | undefined> => {
    let interactionUpvote = 0
    let upvoteNumber = 0
    if (upvote == true){
        upvoteNumber = 1
        interactionUpvote = 1
    }
    else {
        upvoteNumber = -1
        interactionUpvote = -1
    }

    upvoteNumber -= alreadyUpvoted
    
    let comment = await service.upvoteDownvote(id, upvoteNumber)

    if (comment != undefined){
        let interactionPayload: ForumInteractionDTO = {
            comment: true,
            post: false,
            topic: false,
            postID: comment.postID,
            commentID: id,
            userID: userID,
            creator: false,
            upvote: interactionUpvote
        }

        const interaction = await interactionsService.setForumInteraction(interactionPayload)
        if (interaction == false){
            return undefined
        }
        return comment.upvotes
    }
    return undefined

}
