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
        upvotes: comment.upvotes,
        edited: comment.edited
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

export const upvoteDownvote = async(commentID: string, upvote: number): Promise<CommentOutput | undefined> => {
    try{
        let comment = await Comment.findByIdAndUpdate(commentID, {$inc: {upvotes: upvote}})
        if (comment != null){
            // due to lazy loading lacking round trip db call
            comment.upvotes = comment.upvotes + upvote

            return comment
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
                skip: values - 10,
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

export const updateById = async(id: string, content: string): Promise<CommentOutput | undefined> => {
    let comment: CommentOutput | null = null
    try {
        comment = await Comment.findByIdAndUpdate(id, {content: content, edited: true})
    }
    catch {
        return undefined
    }
    if (comment == null){
        return undefined
    }
    comment.content = content
    comment.edited = true
    return comment
}

export const getCountById = async(composeID: string): Promise<number> => {
        return await Comment.find({composeID: composeID}).count()
}