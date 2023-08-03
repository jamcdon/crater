import { CommentInput, CommentOutput } from '../../../db/nosql/models/Comment'
import * as service from '../../../db/nosql/services/commentService'
import { ComposeInteractionDTO, commentComposeInteractionsMapper } from '../../dto/interactions.dto'
import * as interactionsService from '../../../db/sql/services/interactionsService'

export const createComment = async(payload: CommentInput): Promise<CommentOutput | undefined> => {
    let comment = await service.create(payload)

    if (comment != undefined){
        let payload = commentComposeInteractionsMapper(comment, true)
        const interactionsSuccess = await interactionsService.setInteraction(payload)
        if (!interactionsSuccess){
            await service.deleteById(comment._id.toString())
            return undefined
        }
        return comment
    }
    return undefined
}

export const upvoteDownvote = async(commentID: string, upvote: boolean, userID: number): Promise<number | undefined> => {
    let comment = await service.upvoteDownvote(commentID, upvote)
    
    if (comment != undefined){
        let payload = commentComposeInteractionsMapper(comment, false)

        const interactionsSuccess = await interactionsService.setInteraction(payload)
        if (!interactionsSuccess){
            await service.deleteById(comment._id.toString())
            return undefined
        }
        return comment.upvotes
    }
    return undefined
}

export const getPaginated = async(composeID: string, page: number): Promise<Array<CommentOutput> | undefined> => {
    return await service.getPaginatedComments(composeID, page)
}

export const deleteComment = async(commentID: string, userID: number): Promise<boolean> => {
    let comment = await service.readById(commentID)
    if (comment != undefined && comment.user == userID){
        return await service.deleteById(commentID)
    }
    return false
}