//nosql
import mongoose, { Types } from 'mongoose';

export type CreateComposeDTO = {
    title: String;
    authorID: number;
    imageName: String;
    imageID: mongoose.Types.ObjectId;
    tags?: Types.Array<String>,
    public: Boolean;
    yaml: String;
    stars: number
}