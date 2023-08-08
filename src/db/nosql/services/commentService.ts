import * as commentDAL from '../dal/Comment'
import { CommentInput, CommentOutput } from '../models/Comment'

export const create = (payload: CommentInput): Promise<CommentOutput | undefined> => {
    return commentDAL.create(payload)
}

export const upvoteDownvote = (commentID: string, upvote: number): Promise<CommentOutput | undefined> => {
    return commentDAL.upvoteDownvote(commentID, upvote)
}

export const deleteById = (id: string): Promise<boolean> => {
    return commentDAL.deleteById(id)
}

export const getPaginatedComments = (composeID: string, page: number): Promise<Array<CommentOutput> | undefined> => {
    return commentDAL.getPaginatedComments(composeID, page)
}

export const readById = (commentID: string): Promise<CommentOutput | undefined> => {
    return commentDAL.readById(commentID)
}

export const updateById = (commentID: string, content: string): Promise<CommentOutput | undefined> => {
    return commentDAL.updateById(commentID, content)
}

export const getCount = (composeID: string): Promise<number> => {
    return commentDAL.getCountById(composeID)
}