import { Schema, model} from 'mongoose';

export interface IComment {
    composeID: Number,
    user: String,
    content: String
}

const CommentSchema = new Schema<IComment>({
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