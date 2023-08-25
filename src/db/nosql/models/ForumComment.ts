import mongoose, { Schema, model } from 'mongoose'

export interface IForumComment {
    _id: mongoose.Types.ObjectId
    postID: string,
    content: string,
    upvotes: number,
    commenterID: number,
    edited: boolean,
    replies: mongoose.Types.Array<IForumComment> | null,
    createdAt: mongoose.Date,
    updatedAt: mongoose.Date
}

export interface ForumCommentInput extends Partial<IForumComment>{}
export interface ForumCommentOutput extends Required<IForumComment>{}

const ForumCommentSchema = new Schema<IForumComment>({
    postID: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true,
    },
    commenterID: {
        type: Number,
        required: true
    },
    edited: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: () => { return Date.now() }
    },
})

ForumCommentSchema.add({
    replies: {
        type: [ForumCommentSchema],
        required: false,
        default: null
    }
})

const ForumComment = model<IForumComment>('ForumComment', ForumCommentSchema)

export { ForumComment }