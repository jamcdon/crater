import { Schema, model} from 'mongoose';

export interface IComment {
    id: Number,
    composeID: Number,
    user: String,
    content: String
}

const CommentSchema = new Schema<IComment>({
    id: {
        type: Number,
        required: true
    },
    composeID: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const Comment = model<IComment>('Comment', CommentSchema)

export { Comment }