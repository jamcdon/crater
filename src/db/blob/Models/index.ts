import { ReadStream } from 'fs'

export interface IBucket {
    name: string;
    region: string;
}

export interface IUpload {
    bucket: 'user' | 'image';
    fileName: string;
    //file: ReadStream;
    size: number;
    buffer: Buffer;
}