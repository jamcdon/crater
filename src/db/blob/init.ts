import { Bucket } from './models'
import { UserBucket, ImageBucket } from './dal'

const buckets: Array<Bucket> = [
    UserBucket,
    ImageBucket
]