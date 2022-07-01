import {Schema, model, Types} from 'mongoose';

export interface ICompose {
    id: Number,
    title: String,
    author: String,
    imageName: String,
    imageID: Number,
    tags: Types.Array<string>,
    public: Boolean
    content: String,
    stars: Number
}

const ComposeModelSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    imageID: {
        type: Number,
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
    content: {
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