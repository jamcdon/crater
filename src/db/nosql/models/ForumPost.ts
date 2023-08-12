import mongoose, { Schema, model } from 'mongoose'

export interface IForumPost {
    _id: mongoose.Types.ObjectId,
    title: string,
    content: string,
    upvotes: number,
    tags: mongoose.Types.Array<string>,
    posterUserID: number,
    views: number,
    createdAt: mongoose.Date,
    updatedAt: mongoose.Date
}

export interface ForumPostInput extends Partial<IForumPost> {}
export interface ForumPostOutput extends Required<IForumPost> {}

const ForumPostSchema = new Schema<IForumPost>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    posterUserID: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: () => { return Date.now() }
    }
})

const ForumPost = model<IForumPost>('ForumPost', ForumPostSchema)

export { ForumPost }