import mongoose, { Schema, model } from 'mongoose'

export interface IForumTopic {
    _id: mongoose.Types.ObjectId,
    title: string,
    description: string,
    active: boolean,
    promoterUserID: number,
    admins: mongoose.Types.Array<number>,
    stars: number
}

export interface ForumTopicInput extends Partial<IForumTopic> {}
export interface ForumTopicOutput extends Required<IForumTopic> {}

const ForumTopicSchema = new Schema<IForumTopic>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    promoterUserID: {
        type: Number,
        required: true
    },
    admins: {
        type: [Number],
        required: false
    },
    stars: {
        type: Number,
        required: true
    }
})

const ForumTopic = model<IForumTopic>('ForumTopic', ForumTopicSchema)

export { ForumTopic }