import { Bucket } from './models'
import { UserBucket, ImageBucket } from './dal'
import { BlobObject } from './models'
import { readFile, readdir } from 'fs/promises'

const defaultImageImage = process.env.MINIO_IMAGE_IMAGE_DEFAULT as string;

const buckets: Array<Bucket> = [
    UserBucket,
    ImageBucket
]

export async function blobInit(): Promise<boolean> {
    let successes: Array<boolean> = []
    
    for (let bucket of buckets){
        const created = await bucket.createIfNotExists()
        console.log(`bucket: ${bucket}\ncreated: ${created}`)
        successes.push(created)
    }
    return successes.includes(false) ? false : true
}

export async function blobPolicy(): Promise<boolean> {
    let successes: Array<boolean> = []
    for (let bucket of buckets){
        const policySet = await bucket.setPoicyRO()
        successes.push(policySet)
    }

    //for (let bucket of buckets){
    //    const policySet = await bucket.validatePolicy(true)
    //    successes.push(policySet)
    //}
    return (successes.includes(false)) ? false : true
}

export async function setImageImageDefault(): Promise<boolean> {
    const defaultSource = await readFile(`public/img/${defaultImageImage}.png`)
    const defaultObject = new BlobObject("image", `${defaultImageImage}.png`, defaultSource.byteLength, defaultSource)
    const result = await defaultObject.upload()
    if (result == true){
        console.log(`image ${defaultImageImage}.png uploaded to bucket image`)
    }
    else {
        console.log(`error uploading image ${defaultImageImage}.png to bucket image`)
    }
    return result
}