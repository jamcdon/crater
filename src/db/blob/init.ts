import { Bucket } from './models'
import { UserBucket, ImageBucket } from './dal'

const buckets: Array<Bucket> = [
    UserBucket,
    ImageBucket
]

export default async function blobInit(): Promise<boolean> {
    let successes: Array<boolean> = []
    
    for (let bucket of buckets) {
        let success: boolean = false;
        let policyInit: boolean | undefined

        const bucketExists = await bucket.createIfNotExists()
        if (bucketExists){
            policyInit = await bucket.setPoicyRO(bucketExists)
        }
        if (policyInit){
            const policySet = await bucket.validatePolicy(policyInit)
            successes.push(policySet)
        }

    }
    if(successes.includes(false)){
        return false
    }
    else{
        return true
    }
}