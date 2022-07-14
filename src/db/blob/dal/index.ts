import { minioClient } from '../config'
import { IBucket, IUpload } from '../Models'

/*export const createUpload = (): IUpload => {
    
}
*/
/*
export const uploadToBucket = (payload: IUpload): boolean => {
    const metaData = {
        'content-type': `image/${payload.fileName.split('.')[1]}`
    }
    let uploaded: boolean = false;
    minioClient.putObject(payload.bucket, payload.fileName, payload.file, payload.size, metaData, (err): void => {
        if (!err) {
            uploaded = true
        }
    })
    return uploaded
}
*/

export const uploadBufferToBucket = (payload: IUpload): boolean => {
    const metaData = {
        'content-type': `image/${payload.fileName.split('.')[1]}`
    }
    let uploaded: boolean = false;
    minioClient.putObject(payload.bucket, payload.fileName, payload.buffer, payload.size, metaData, (err): void => {
        if (!err) {
            uploaded = true;
        }
    })
    return uploaded;
}