import { Bucket } from './models'
import { UserBucket, ImageBucket } from './dal'

const buckets: Array<Bucket> = [
    UserBucket,
    ImageBucket
]

export default async function blobInit(): Promise<boolean> {
    let successes: Array<boolean> = []
    
    for (let bucket of buckets) {
        await bucket.createIfNotExists()
            .then(async (created) => {
                await bucket.setPoicyRO(created)
                    .then(async (changed) =>{
                        const policySet = await bucket.validatePolicy(changed)
                        successes.push(policySet)
                })
        })
    }
    if(successes.includes(false)){
        return false
    }
    else{
        return true
    }
}