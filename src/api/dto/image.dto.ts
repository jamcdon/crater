//nosql
import mongoose from 'mongoose';
import Types from 'mongoose'

export type CreateImageDTO = {
    _id?: mongoose.Types.ObjectId;
    name: String;
    hyperlink: String;
}

export type UpdateImageDTO = Partial<CreateImageDTO>