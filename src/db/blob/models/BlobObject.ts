import { minioClient } from "../config";

type bucketType = 'user' | 'image'

export class BlobObject {
    bucket: bucketType;
    //bucket: 'user' | 'image';
    name: string;
    size: number;
    buffer: Buffer;

    constructor(bucket: bucketType, name: string, size: number, buffer: Buffer) {
        this.bucket = bucket;
        this.name = name;
        this.size = size;
        this.buffer = buffer;
    }

    upload(): boolean {
        const metaData = {
            'content-type': `image/${this.name.split('.')[1]}`
        }
        let uploaded: boolean = false;
        minioClient.putObject(this.bucket, this.name, this.buffer, this.size, metaData, (err): void => {
            if (err) {
                console.log(err)
            }
            else {
                uploaded = true;
            }
        })
        return uploaded
    }
}