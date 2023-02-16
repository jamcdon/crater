import mongoose, {Schema, model, Types} from 'mongoose';

export interface ICompose {
    _id: mongoose.Types.ObjectId,
    title: string,
    authorID: number,
    imageName: string,
    imageID: mongoose.Types.ObjectId,
    tags: Types.Array<string>,
    public: Boolean
    yaml: string,
    stars: number
}

export interface ComposeModification {
    _id: mongoose.Types.ObjectId,
    title: string,
    authorName: string,
    imageName: string,
    tags: Types.Array<string>,
    stars: number
}

export interface ComposeInput extends Partial<ICompose> {}
export interface ComposeOutput extends Required<ICompose> {}

const ComposeModelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authorID: {
        type: Number,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    imageID: {
        type: String,
        required: true
    },
    tags:{
        type: [String],
        required: false
    },
    public: {
        type: Boolean,
        required: true,
        default: true
    },
    yaml: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
})

const Compose = model<ICompose>('Compose', ComposeModelSchema)

export { Compose }