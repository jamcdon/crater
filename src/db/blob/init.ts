import { minioClient } from "./config";

const createBucket = (bucketName: string) => {
    minioClient.bucketExists(bucketName, (err, exists) => {
        if (err) {
            return console.log(err)
        }
        if (exists) {
            return console.log(`${bucketName} bucket already exists.`)
        }
        else {
            minioClient.makeBucket(bucketName, '', (err) => {
                if (err) {
                    console.log(`error creating ${bucketName}`, err)
                }
                console.log(`${bucketName} bucket created`)
            })
        }
    })
}

const setBucketPolicyRO = (bucketName: string) => {
    const policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": [
                    "s3:GetBucketLocation",
                    "s3:ListBucket"
                ],
                "Effect": "Allow",
                "Principal": {
                    "AWS": [
                        "*"
                    ]
                },
                "Resource": [
                    `arn:aws:s3:::${bucketName}`
                ],
                "Sid": ""
            },
            {
                "Action": [
                    "s3:GetObject"
                ],
                "Effect": "Allow",
                "Principal": {
                    "AWS": [
                        "*"
                    ]
                },
                "Resource": [
                    `arn:aws:s3:::${bucketName}/*`
                ],
                "Sid": ""
            }
        ]
    }
    minioClient.setBucketPolicy(bucketName, JSON.stringify(policy), (err) => {
        if (err) throw err;
        console.log(`${bucketName} bucket policy set to RO`)
    })
}