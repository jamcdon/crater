import { CommentInput, CommentOutput } from '../../../db/nosql/models/Comment'
import * as service from '../../../db/nosql/services/commentService'
import { ComposeInteractionDTO } from '../../dto/interactions.dto'
import * as interactionsService from '../../../db/sql/services/interactionsService'

export const createComment = async(payload: CommentInput): Promise<CommentOutput | undefined> => {
    let comment = await service.create(payload)

    if (comment != undefined){
        let payload: ComposeInteractionDTO = {
            composeID: comment.composeID,
            imageID: undefined,
            UserId: comment.user,
            commentID: comment._id.toString(),
            comment: true,
            star: false,
            creator: true
        }
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
        let payload: ComposeInteractionDTO = {
            composeID: comment.composeID,
            imageID: undefined,
            UserId: userID,
            commentID: comment._id.toString(),
            comment: true,
            star: false,
            creator: false
        }
        const interactionsSuccess = await interactionsService.setInteraction(payload)
        if (!interactionsSuccess){
            await service.deleteById(comment._id.toString())
            return undefined
        }
        return comment.upvotes
    }
    return undefined
}