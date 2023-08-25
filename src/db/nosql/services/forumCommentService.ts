import * as forumCommentDAL from '../dal/ForumComment'
import { ForumCommentInput, ForumCommentOutput } from '../models/ForumComment'

export const create = async (payload: ForumCommentInput): Promise<ForumCommentOutput | undefined> => {
    return forumCommentDAL.create(payload)
}

export const deleteById = async (id: string): Promise<boolean> => {
    return forumCommentDAL.deleteById(id)
}

export const getById = async (id: string): Promise<ForumCommentOutput | undefined> => {
    return forumCommentDAL.getById(id)
}

export const update = async (id: string, content: string): Promise<ForumCommentOutput | undefined> => {
    return forumCommentDAL.updateById(id, content)
}

export const upvoteDownvote = async (id: string, upvote:number): Promise<ForumCommentOutput | undefined> => {
    return forumCommentDAL.upvoteDownvote(id, upvote)
}

export const getPaginated = async (postID: string, page: number): Promise<Array<ForumCommentOutput> | undefined> => {
    return forumCommentDAL.getPaginatedComments(postID, page)
}