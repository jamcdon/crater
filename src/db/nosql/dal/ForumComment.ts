import { ForumComment } from "../models";
import { ForumCommentInput, ForumCommentOutput } from "../models/ForumComment";

export const create = async(payload: ForumCommentInput): Promise<ForumCommentOutput | undefined> => {
    let forumComment
    try {
        forumComment = await ForumComment.create(payload)
    }
    catch {
        return undefined
    }

    forumComment.save()

    return forumComment
}

export const upvoteDownvote = async(forumCommentID: string, upvote: number): Promise<ForumCommentOutput | undefined> => {
    try {
        let forumComment = await ForumComment.findByIdAndUpdate(forumCommentID, {$inc: {upvotes: upvote}})
        if (forumComment != null){
            forumComment.upvotes = forumComment.upvotes + upvote

            return forumComment
        }
        return undefined
    }
    catch {
        return undefined
    }
}

export const deleteById = async(id: string): Promise<boolean> => {
    const deletion = await ForumComment.deleteOne({
        _id: id
    })

    return deletion.acknowledged
}

export const getById = async(id: string): Promise<ForumCommentOutput | undefined> => {
    try {
        const forumComment = await ForumComment.findById(id)
        if (forumComment != null){
            return forumComment
        }
    }
    catch {
        return undefined
    }
}

export const getPaginatedComments = async(postID: string, page: number): Promise<Array<ForumCommentOutput> | undefined> => {
    const values = page * 10
    let forumComments: Array<ForumCommentOutput> | null = null

    try {
        forumComments = await ForumComment.find(
            {
                postID: postID
            },
            {},
            {
                skip: values - 10,
                limit: values,
                sort: {upvotes: -1}
            }
        )
    }
    catch {
        return undefined
    }
    return forumComments
}

export const updateById = async(id: string, content: string): Promise<ForumCommentOutput | undefined> => {
    try {
        let forumComment = await ForumComment.findByIdAndUpdate(id, {content: content, edited: true})
        if (forumComment != null){
            forumComment.content = content
            forumComment.edited = true
            return forumComment
        }
    }
    catch {
        return undefined
    }
    return undefined
}