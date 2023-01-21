//nosql
import mongoose, { Types } from 'mongoose';

export type CreateComposeDTO = {
    title: string;
    authorID: number;
    imageName: string;
    imageID: mongoose.Types.ObjectId;
    tags?: Types.Array<string>,
    public: Boolean;
    yaml: string;
    stars: number
}