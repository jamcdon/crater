import { Comment } from '../models'
import { CommentInput, CommentOutput } from '../models/Comment'

export const create = async(payload: CommentInput): Promise<CommentOutput | undefined> => {

    let comment
    try {
        comment = await Comment.create(payload)
    }
    catch {
        return undefined
    }
    const createdComment: CommentOutput = {
        _id: comment._id,
        composeID: comment.composeID,
        user: comment.user,
        content: comment.content,
        upvotes: comment.upvotes
    }

    comment.save()

    return createdComment
}

export const readById = async (commentID: string): Promise<CommentOutput | undefined> => {
    let comment = await Comment.findById(commentID)
    if (comment == null){
        return undefined
    }
    return comment
}

export const upvoteDownvote = async(commentID: string, upvote: boolean): Promise<CommentOutput | undefined> => {
    try{
        let comment = await Comment.findById(commentID)
        if (comment != null){
            if (upvote) {
                comment.upvotes = comment.upvotes + 1
            }
            else {
                comment.upvotes = comment.upvotes - 1
            }
            const updatedComment = await Comment.findByIdAndUpdate(commentID, comment)
            if (!updatedComment){
                return undefined
            }
            return updatedComment
        }
        return undefined
    }
    catch(err){
        return undefined
    }
}

export const deleteById = async(id: string): Promise<boolean> => {
    const deletion = await Comment.deleteOne({
        _id: id
    })

    return deletion.acknowledged
}

export const getPaginatedComments = async(composeID: string, page: number): Promise<Array<CommentOutput> | undefined> => {
    const values = page * 10
    let comments: Array<CommentOutput> | null = null

    try {
        comments = await Comment.find(
            {
                composeID: composeID
            },
            {},
            {
                skipe: values - 10,
                limit: values,
                sort: {upvotes: -1}
            }
        )
    }
    catch {
        return undefined
    }
    return comments
}