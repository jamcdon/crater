//nosql
import mongoose, { Types } from 'mongoose';

export type CreateComposeDTO = {
    title: string;
    manifest: boolean;
    authorID: number;
    imageName: string;
    imageID: mongoose.Types.ObjectId;
    tags?: Types.Array<string>,
    public: Boolean;
    yaml: string;
    yamls?: Record<string, string>
    stars: number
}