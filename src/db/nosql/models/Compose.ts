import {Schema, model, Types} from 'mongoose';

export interface ICompose {
    title: String,
    author: String,
    imageName: String,
    imageID: Number,
    tag: String,
    labels: Types.Array<string>,
    public: Boolean
    content: String,
    stars: Number
}

const ComposeModelSchema = new Schema({
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
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: false
    },
    labels:{ 
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