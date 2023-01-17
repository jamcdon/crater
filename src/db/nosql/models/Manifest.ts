import mongoose, {Schema, model, Types} from 'mongoose';

export interface IManifest {
    _id: mongoose.Types.ObjectId,
    title: String,
    authorID: Number,
    imageName: String,
    imageID: mongoose.Types.ObjectId,
    tags: Types.Array<String>,
    public: Boolean
    yamls: {
        [key: string]: String
    }
    stars: Number
}

export interface ManifestInput extends Partial<IManifest> {}
export interface ManifestOutput extends Required<IManifest> {}

const ManifestModelSchema = new Schema({
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
    yamls: {
        type: Map,
        of: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
})

const Manifest = model<IManifest>('Manifest', ManifestModelSchema)

export { Manifest }