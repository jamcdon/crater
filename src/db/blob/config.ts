import * as minio from 'minio';

const minioHost = process.env.MINIO_HOST as string;
const dbUser = process.env.MINIO_USER as string;
const dbPassword = process.env.MINIO_PASS as string;
const minioPort: number = +(process.env.MINIO_PORT as string);

export const minioClient = new minio.Client({
    endPoint: minioHost,
    port: minioPort,
    useSSL: false,
    accessKey: dbUser,
    secretKey: dbPassword
})