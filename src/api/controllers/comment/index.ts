import { CommentInput, CommentOutput } from '../../../db/nosql/models/Comment'
import * as service from '../../../db/nosql/services/commentService'
import { commentComposeInteractionsMapper } from '../../dto/interactions.dto'
import * as interactionsService from '../../../db/sql/services/interactionsService'
import { CommentJsonOutput } from '../../dto/comment.dto'
import { getUsernameByID } from '../compose'

// start helper functions *** *** *** ***

type paginatedCommentReturn = {
    count: number, // may soft fail with 0; 0 still reasonable output
    comments: Array<CommentJsonOutput>
}

const commentToJsonOutput = async(comment: CommentOutput): Promise<CommentJsonOutput> => {
    const username = await getUsernameByID(comment.user)
    if (username == undefined){
        return {
            id: comment._id.toString(),
            composeID: comment.composeID,
            userID: comment.user,
            user: comment.user.toString(),
            content: comment.content,
            upvotes: comment.upvotes,
            edited: comment.edited
        }
    }
    return {
        id: comment._id.toString(),
        composeID: comment.composeID,
        userID: comment.user,
        user: username,
        content: comment.content,
        upvotes: comment.upvotes,
        edited: comment.edited
    }
}

const commentsToJsonOutput = async(comments: CommentOutput[]): Promise<Array<CommentJsonOutput>> => {
    const getUsernameOrStringify = async(id: number): Promise<string> => {
        let username = await getUsernameByID(id)
        if (username == undefined){
            return id.toString()
        }
        return username
    }

    let commentJsonArray: CommentJsonOutput[] = []
    for (let i = 0; i < comments.length; i++){
        commentJsonArray.push({
            id: comments[i]._id.toString(),
            composeID: comments[i].composeID,
            userID: comments[i].user,
            user: (await getUsernameOrStringify(comments[i].user)),
            content: comments[i].content,
            upvotes: comments[i].upvotes,
            edited: comments[i].edited
        })
    }

    return commentJsonArray
}

// end helper functions   *** *** *** ***

export const createComment = async(payload: CommentInput): Promise<CommentJsonOutput | undefined> => {
    let comment = await service.create(payload)
    if (comment != undefined){
        let payload = commentComposeInteractionsMapper(comment, comment.user, true, null)
        const interactionsSuccess = await interactionsService.setInteraction(payload)
        if (!interactionsSuccess){
            await service.deleteById(comment._id.toString())
            return undefined
        }
        return commentToJsonOutput(comment)
    }
    return undefined
}

export const upvoteDownvote = async(commentID: string, upvote: boolean, userID: number, alreadyUpvoted: number): Promise<number | undefined> => {
    let interactionUpvote = 0
    let upvoteNumber = 0
    if (upvote == true){
        upvoteNumber = 1

        interactionUpvote = 1
    }
    if (upvote == false){
        upvoteNumber = -1

        interactionUpvote = -1
    }

    upvoteNumber -= alreadyUpvoted

    let comment = await service.upvoteDownvote(commentID, upvoteNumber)

    if (comment != undefined){
        let payload = commentComposeInteractionsMapper(comment, userID, false, interactionUpvote)

        const interactionsSuccess = await interactionsService.setInteraction(payload)
        if (!interactionsSuccess){
            await service.deleteById(comment._id.toString())
            return undefined
        }
        return comment.upvotes
    }
    return undefined
}

export const getPaginated = async(composeID: string, page: number): Promise<paginatedCommentReturn | undefined> => {
    let rawComments = await service.getPaginatedComments(composeID, page)

    if (rawComments == undefined){
        return rawComments
    }

    return {
        count: await service.getCount(composeID),
        comments: await commentsToJsonOutput(rawComments)
    }
}

export const deleteComment = async(commentID: string, userID: number): Promise<boolean> => {
    let comment = await service.readById(commentID)
    if (comment != undefined && comment.user == userID){
        return await service.deleteById(commentID)
    }
    return false
}

export const updateById = async(commentID: string, userID: number, content: string): Promise<CommentJsonOutput | undefined> => {
    let comment = await service.readById(commentID)
    if (comment != undefined && comment.user == userID){
        let updated = await service.updateById(commentID, content)
        if (updated != undefined){
            return await commentToJsonOutput(updated)
        }
    }
    return undefined
}

export const checkIfUpvoted = async(commentID: string, userID: number): Promise<number> => {
    return await interactionsService.checkIfCommentUpvoted(commentID, userID)
}