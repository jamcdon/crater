import * as commentDAL from '../dal/Comment'
import { CommentInput, CommentOutput } from '../models/Comment'

export const create = (payload: CommentInput): Promise<CommentOutput | undefined> => {
    return commentDAL.create(payload)
}

export const upvoteDownvote = (commentID: string, upvote: boolean): Promise<CommentOutput | undefined> => {
    return commentDAL.upvoteDownvote(commentID, upvote)
}

export const deleteById = (id: string): Promise<boolean> => {
    return commentDAL.deleteById(id)
}