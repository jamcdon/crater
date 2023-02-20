//nosql
import mongoose from 'mongoose';

export type CreateImageDTO = {
    _id?: mongoose.Types.ObjectId;
    name: string;
    hyperlink: string;
    scriptsUsing: number;
    authorID: number;
}

export type UpdateImageDTO = Partial<CreateImageDTO>