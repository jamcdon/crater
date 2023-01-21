//nosql
import mongoose, { Types } from 'mongoose';

export type CreateManifestDTO = {
    title: string;
    authorID: number;
    imageName: string;
    imageID: mongoose.Types.ObjectId;
    tags?: Types.Array<string>,
    public: Boolean;
    yamls: Record<string, string>
    stars: number
}