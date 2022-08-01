import { minioClient } from "../config";

export class Bucket {
    name: string;
    region: string;

    constructor(name: string, region: string) {
        this.name = name;
        this.region = region;
    }

    // async added to handle async/await .then()((bool)=>{setPolicyRO()}) fn
    async createIfNotExists(): Promise<void> {//Promise<boolean> {
        let created: boolean = false;
        //minioClient.bucketExists(this.name, (err, exists) => {
        //    if (err) {
        //        console.log(err)
        //    }
        //    if (exists) {
        //        console.log(`${this.name} already exists. Bucket not created`)
        //        // required for .then() function - established bucket created
        //        created = true
        //    }
        //    else {
            if (await minioClient.bucketExists(this.name)) {
                minioClient.makeBucket(this.name, this.region) //{, (err) => {
        //            if (err) {
        //                console.log(err)
        //            }
        //            else {
                        console.log(`${this.name} bucket created`)
                        created = true;
        //            }
        //        })
        //    }
        //})
    //    return created
    //}
    //async setPoicyRO  (lastComplete: boolean):  Promise<boolean> {
    //    let changed: boolean = false;
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
                //changed = true;
            }
        })
    }
        //return changed
    }
    async validatePolicy (policySet: boolean): Promise<boolean> {
        let expectedPolicy: string | undefined;
        let actualPolicy: string | undefined;

        if(policySet){
            const expectedPolicy = `{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:GetBucketLocation","s3:ListBucket"],"Resource":["arn:aws:s3:::${this.name}"]},{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:GetObject"],"Resource":["arn:aws:s3:::${this.name}/*"]}]}`
            const actualPolicy = await minioClient.getBucketPolicy(this.name)
        }
        return (expectedPolicy == actualPolicy) ? true : false
    }
}