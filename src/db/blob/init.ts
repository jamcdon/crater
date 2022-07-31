import { Bucket } from './models'
import { UserBucket, ImageBucket } from './dal'

const buckets: Array<Bucket> = [
    UserBucket,
    ImageBucket
]

export default async function blobInit(): Promise<boolean> {
    let successes: Array<boolean> = []
    
    for (let bucket of buckets) {
        let policyInit: boolean | undefined

        await bucket.createIfNotExists()
        setTimeout(() => {}, 8000)
        await bucket.setPoicyRO()
        setTimeout(() => {}, 8000)
        const policySet = await bucket.validatePolicy()
        successes.push(policySet)
    }
    if(successes.includes(false)){
        return false
    }
    else{
        return true
    }
}