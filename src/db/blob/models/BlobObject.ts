import { CopyConditions } from "minio";
import { minioClient } from "../config";

type bucketType = 'user' | 'image'

export class BlobObject {
    bucket: bucketType;
    name: string;
    size: number;
    buffer: Buffer | null;

    constructor(bucket: bucketType, name: string, size: number, buffer: Buffer | null) {
        this.bucket = bucket;
        this.name = name;
        this.size = size;
        this.buffer = buffer;
    }

    async upload(): Promise<boolean> {
        const metaData = {
            'content-type': `image/${this.name.split('.')[1]}`
        }
        if (this.buffer != null){
            let uploadedObject = await minioClient.putObject(this.bucket, this.name, this.buffer, this.size,)
            if (uploadedObject.etag){
                return true
            }
        }
        return false
    }
    async copy(sourceFile: string): Promise<boolean> {
        const stat = await minioClient.statObject(this.bucket, sourceFile)

        let copyConditions = new CopyConditions()
        copyConditions.setMatchETag(stat.etag)

        const newObject = await minioClient.copyObject(this.bucket, this.name, `/${this.bucket}/${sourceFile}`, copyConditions)

        if(newObject.etag == stat.etag){
            return true
        }
        return false
    }
}