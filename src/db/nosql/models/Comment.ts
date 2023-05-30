import mongoose, { Schema, model} from 'mongoose';

export interface IComment {
    _id: mongoose.Types.ObjectId,
    composeID: string,
    user: number,
    content: string,
    upvotes: number
}

export interface CommentInput extends Partial<IComment>{}
export interface CommentOutput extends Required<IComment>{}

const CommentSchema = new Schema<IComment>({
    composeID: {
        type: String,
        required: true
    },
    user: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    }
})

const Comment = model<IComment>('Comment', CommentSchema)

export { Comment }