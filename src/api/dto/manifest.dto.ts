//nosql
import mongoose, { Types } from 'mongoose';

export type CreateManifestDTO = {
    title: String;
    authorID: Number;
    imageName: String;
    imageID: mongoose.Types.ObjectId;
    tags?: Types.Array<String>,
    public: Boolean;
    yamls: Record<string, String>
    stars: Number
}