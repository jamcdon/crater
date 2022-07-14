import { IBucket, IUpload } from ".";

export const ImageBucket: IBucket = {
    name: "image",
    region: ""
}

/*
export interface ImageUpload {
    fileName: string;
    size: number;
    buffer: Buffer;
}

const newObject: ImageUpload = {
    fileName: "yes.png",
    size: 10,
    buffer: Buffer.alloc(10)
}

const createNew = (payload: ImageUpload): IUpload => {
    return {
        bucket: 'image',
        fileName: payload.fileName,
        size: payload.size,
        buffer: payload.buffer
    }
}
*/