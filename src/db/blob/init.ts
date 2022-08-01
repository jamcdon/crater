import { Bucket } from './models'
import { UserBucket, ImageBucket } from './dal'

const buckets: Array<Bucket> = [
    UserBucket,
    ImageBucket
]

export async function blobInit(): Promise<boolean> {
    let successes: Array<boolean> = []
    
    for (let bucket of buckets){
        await bucket.createIfNotExists()
    }
    return (successes.includes(false)) ? false : true
}

export async function blobPolicy(): Promise<boolean> {
    let successes: Array<boolean> = []
    for (let bucket of buckets){
        await bucket.setPoicyRO()
    }

    //for (let bucket of buckets){
    //    const policySet = await bucket.validatePolicy(true)
    //    successes.push(policySet)
    //}
    return (successes.includes(false)) ? false : true

}