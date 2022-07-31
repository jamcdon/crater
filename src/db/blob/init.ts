import { Bucket } from './models'
import { UserBucket, ImageBucket } from './dal'

const buckets: Array<Bucket> = [
    UserBucket,
    ImageBucket
]

export default async function blobInit() {//: Promise<boolean> {
    //let successes: Array<boolean> = []
    for (let bucket of buckets) {
        //let success: boolean = false;
        await bucket.createIfNotExists()
            //.then(
            //    () => {
                       await bucket.setPoicyRO()
            //    }
            //)
        //successes.push(success)
    }
    //if (successes.includes(false)){
    //    return false
    //}
    //else {
    //    return true
    //}
}