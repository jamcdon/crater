//nosql
import mongoose, { StringExpressionOperatorReturningBoolean } from 'mongoose';

export type CreateImageDTO = {
    _id?: mongoose.Types.ObjectId;
    name: string;
    hyperlink: string;
    description: string;
    scriptsUsing: number;
    reports: 0;
    authorID: number;
}

export type UpdateImageDTO = Partial<CreateImageDTO>