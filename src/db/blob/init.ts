import { Bucket } from './models'
import { UserBucket, ImageBucket } from './dal'

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