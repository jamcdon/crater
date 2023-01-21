import { Schema, model} from 'mongoose';

export interface IComment {
    composeID: number,
    user: string,
    content: string
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