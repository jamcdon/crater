import { CommentInput, CommentOutput } from '../../../db/nosql/models/Comment'
import * as service from '../../../db/nosql/services/commentService'
import { commentComposeInteractionsMapper } from '../../dto/interactions.dto'
import * as interactionsService from '../../../db/sql/services/interactionsService'
import { CommentJsonOutput } from '../../dto/comment.dto'
import { getUsernameByID } from '../compose'

// start helper functions *** *** *** ***

const commentToJsonOutput = async(comment: CommentOutput): Promise<CommentJsonOutput> => {
    const username = await getUsernameByID(comment.user)
    if (username == undefined){
        return {
            composeID: comment.composeID,
            user: comment.user.toString(),
            content: comment.content,
            upvotes: comment.upvotes,
            edited: comment.edited
        }
    }
    return {
        composeID: comment.composeID,
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
            composeID: comments[i].composeID,
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
        let payload = commentComposeInteractionsMapper(comment, true)
        const interactionsSuccess = await interactionsService.setInteraction(payload)
        if (!interactionsSuccess){
            await service.deleteById(comment._id.toString())
            return undefined
        }
        return commentToJsonOutput(comment)
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

export const getPaginated = async(composeID: string, page: number): Promise<Array<CommentJsonOutput> | undefined> => {
    let rawComments = await service.getPaginatedComments(composeID, page)

    if (rawComments == undefined){
        return rawComments
    }

    return commentsToJsonOutput(rawComments)
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