import { minioClient } from "../config";

export class Bucket {
    name: string;
    region: string;

    constructor(name: string, region: string) {
        this.name = name;
        this.region = region;
    }

    createIfNotExists(): boolean {
        let created: boolean = false;
        minioClient.bucketExists(this.name, (err, exists) => {
            if (err) {
                console.log(err)
            }
            if (exists) {
                console.log(`${this.name} already exists. Bucket not created`)
            }
            else {
                minioClient.makeBucket(this.name, this.region, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(`${this.name} bucket created`)
                        created = true;
                    }
                })
            }
        })
        return created
    }
    setPoicyRO(): boolean {
        let changed: boolean = false;
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
                        `arn:aws:s3:::${this.name}`
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
                        `arn:aws:s3:::${this.name}/*`
                    ],
                    "Sid": ""
                }
            ]
        }
        minioClient.setBucketPolicy(this.name, JSON.stringify(policy), (err) => {
            if (err) {
                throw err;
            }
            else {
                console.log(`${this.name} bucket policy set to global RO`)
                changed = true;
            }
        })
        return changed;
    }
}